from dotenv import load_dotenv
import os
import pandas as pd
from pathlib import Path
from datetime import datetime

from tapeagents.agent import Agent
from tapeagents.dialog_tape import DialogTape, UserStep, AssistantThought, AssistantStep
from tapeagents.llms import OpenrouterLLM, LLMEvent, LLMStream, LLMOutput
from tapeagents.nodes import GoTo, Node
from tapeagents.orchestrator import main_loop
from tapeagents.environment import ToolCollectionEnvironment
from tapeagents.core import Prompt, SetNextNode
from tapeagents.prompting import tape_to_messages

# Load environment variables from .env file
load_dotenv()

# Get API keys
api_key = os.getenv('OPEN_ROUTER_KEY')
if not api_key:
    raise ValueError("OPEN_ROUTER_KEY not found in environment variables")

# Create LLM instance
llm = OpenrouterLLM(
    model_name="meta-llama/llama-3.3-70b-instruct:free",
    api_token=api_key,
)

# Function to count applications
def count_applications():
    try:
        # Get the path to the CSV file
        csv_path = Path("examples/childcare_subsidy/docs/cleaned_csv_data.csv")
        df = pd.read_csv(csv_path)
        
        total_applications = len(df)
        incomplete_docs = len(df[df['incomplete_docs'] == True])
        
        return f"EXACT COUNT: Total applications: {total_applications}, Applications with incomplete documentation: {incomplete_docs}"
    except Exception as e:
        return f"Error counting applications: {str(e)}"
    

system_prompt = """Your name is Stix. You are an assistant working at a municipality in the Netherlands. 
You help workers with their daily tasks and questions regarding childcare subsidy applications processing. 
You are friendly and professional.
You are also very helpful and always try to help the user.
You always tell the user what you are doing and what you are looking for.
Keep your responses short and professional.
Always wait for the user's response before proceeding.
Never end the conversation - always wait for the user to type 'quit'.
Respond directly without adding any prefixes or labels to your messages."""

system_message = {"role": "system", "content": system_prompt}

class CSVLookupNode(Node):
    name: str = "csv_lookup"

    def make_prompt(self, agent, tape: DialogTape) -> Prompt:
        guidance = """You are an assistant that helps analyze childcare subsidy applications.
        When asked about applications, you should:
        1. First, understand what specific information the user needs
        2. Then, use the count_applications() function to get the data
        3. Finally, provide a response that directly answers their question using the exact numbers
        
        For example:
        - If they ask "How many applications are there?", provide the total count
        - If they ask "How many incomplete applications?", focus on the incomplete docs count
        - If they ask "What's the status of applications?", provide both numbers with context
        
        Always use the EXACT numbers from the count_applications() function.
        Do not make up or modify any numbers.
        
        After providing the data, always transition back to the chat node."""
        guidance_message = {"role": "user", "content": guidance}
        return Prompt(
            messages=[system_message] + tape_to_messages(tape) + [guidance_message]
        )

    def generate_steps(self, agent, tape, llm_stream: LLMStream):
        # Get the data first
        count_result = count_applications()
        
        # Let the LLM formulate a response using the data
        response_prompt = Prompt(
            messages=[
                system_message,
                {"role": "user", "content": f"Based on this data: {count_result}\nProvide a clear, direct response to the user's question. Use the exact numbers from the data."}
            ]
        )
        response_stream = llm.generate(response_prompt)
        response = response_stream.get_output().content
        
        yield AssistantStep(content=response)
        yield SetNextNode(next_node="chat")  # Always go back to chat after providing data

class WelcomeNode(Node):
    name: str = "welcome"

    def make_prompt(self, agent, tape: DialogTape) -> Prompt:
        guidance = "Greet the user only at the beginning of the conversation using: ""Hello, my name is Stix 👋 . I'm an assistant working at a municipality in the Netherlands. How can I help you today? Let me know if you would like to see the status of the applications and get more information about the process."" and ask how you can help them today."
        guidance_message = {"role": "user", "content": guidance}
        return Prompt(
            messages=[system_message] + tape_to_messages(tape) + [guidance_message]
        )

    def generate_steps(self, agent, tape, llm_stream: LLMStream):
        if content := llm_stream.get_output().content:
            yield AssistantStep(content=content)
            yield SetNextNode(next_node="chat")
        else:
            raise ValueError()

class ChatNode(Node):
    name: str = "chat"

    def make_prompt(self, agent, tape: DialogTape) -> Prompt:
        guidance = """You are an assistant that helps with childcare subsidy applications.
        When the user asks about:
        - Number of applications
        - Application statistics
        - Incomplete documentation
        - Any numerical data about applications
        
        You should transition to the csv_lookup node to get accurate data.
        For all other questions, respond directly.
        
        To transition to csv_lookup, use SetNextNode(next_node="csv_lookup").
        To stay in chat, use SetNextNode(next_node="chat")."""
        guidance_message = {"role": "user", "content": guidance}
        return Prompt(
            messages=[system_message] + tape_to_messages(tape) + [guidance_message]
        )

    def generate_steps(self, agent, tape, llm_stream: LLMStream):
        if content := llm_stream.get_output().content:
            # Check if the response indicates we should look up data
            if any(keyword in content.lower() for keyword in ["looking up", "checking data", "getting numbers", "let me check"]):
                yield SetNextNode(next_node="csv_lookup")
            else:
                yield AssistantStep(content=content)
                yield SetNextNode(next_node="chat")
        else:
            raise ValueError()

# Create a node that always goes back to chat
goto_chat = GoTo(
    name="goto_chat",
    next_node="chat"
)

agent = Agent.create(
    llms=llm,
    nodes=[WelcomeNode(), ChatNode(), CSVLookupNode(), goto_chat]
)

# Create an empty environment
environment = ToolCollectionEnvironment(tools=[])
environment.initialize()

def process_agent_response(agent, tape, environment):
    """Run one step of the agent, then pause."""
    for event in main_loop(agent, tape, environment):
        if event.agent_event and event.agent_event.step:
            step = event.agent_event.step
            llm_view = step.llm_view()
            # Skip printing if it's a set_next_node transition
            if not ('"kind": "set_next_node"' in llm_view):
                # Extract just the content from the JSON response
                if '"content": "' in llm_view:
                    content = llm_view.split('"content": "')[1].split('"')[0]
                    print(content)
            # Always append the step to maintain the conversation flow
            tape = tape.append(step)
            # If this was a set_next_node step, continue the loop to get the actual response
            if '"kind": "set_next_node"' in llm_view:
                continue
            return tape
        elif event.agent_tape:
            return event.agent_tape
    return tape

# Start the conversation loop
print("Welcome! Type 'quit' to end the conversation.")
user_input = input("\nYou: ").strip()
tape = DialogTape(steps=[UserStep(content=user_input)])
tape = process_agent_response(agent, tape, environment)

while True:
    user_input = input("\nYou: ").strip()
    if user_input.lower() == 'quit':
        print("\nFull conversation history:")
        print(tape)
        print("\nGoodbye! Have a great day!")
        break
    
    tape = tape.append(UserStep(content=user_input))
    tape = process_agent_response(agent, tape, environment)