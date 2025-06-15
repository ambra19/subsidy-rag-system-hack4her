import csv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from my_agent import agent, environment, DialogTape, UserStep, process_agent_response
import os
import ast


app = FastAPI()

# Add CORS middleware with more permissive settings for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
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
    
@app.get("/count")
async def get_incomplete_docs_entries():
    try:
        file_path = "docs/cleaned_csv_data.csv"
        incomplete_entries = []

        with open(file_path, mode='r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row.get("incomplete_docs", "").strip().upper() == "TRUE":
                    # Safely parse the 'flags' field and count True values
                    flags_str = row.get("flags", "")
                    try:
                        flags_dict = ast.literal_eval(flags_str)
                        true_flags = sum(1 for v in flags_dict.values() if v is True)
                    except Exception:
                        true_flags = 0  # fallback if flags can't be parsed

                    # Add the count to the row
                    row["true_flag_count"] = true_flags

                    incomplete_entries.append(row)

        return JSONResponse(content={"entries": incomplete_entries})
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="CSV file not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
