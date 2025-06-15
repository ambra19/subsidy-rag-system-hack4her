from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from agents.my_agent import agent, environment, DialogTape, UserStep, process_agent_response

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    content: str

class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat(message: Message):
    try:
        # Initialize or get existing tape
        if not hasattr(app, 'tape'):
            app.tape = DialogTape(steps=[UserStep(content=message.content)])
        else:
            app.tape = app.tape.append(UserStep(content=message.content))
        
        # Process the message
        app.tape = process_agent_response(agent, app.tape, environment)
        
        # Get the last assistant response
        last_response = None
        for step in reversed(app.tape.steps):
            if hasattr(step, 'content'):
                last_response = step.content
                break
        
        if last_response is None:
            raise HTTPException(status_code=500, detail="No response generated")
            
        return ChatResponse(response=last_response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 