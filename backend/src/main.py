from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import AsyncOpenAI
from typing import List
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# LM Studio configuration
LM_STUDIO_URL = os.getenv("LM_STUDIO_URL", "http://192.168.0.230:1234/v1")
LM_STUDIO_API_KEY = os.getenv("LM_STUDIO_API_KEY", "lm-studio")
MODEL_NAME = os.getenv("MODEL_NAME", "qwen/qwen3-vl-4b")

client = AsyncOpenAI(
    base_url=LM_STUDIO_URL,
    api_key=LM_STUDIO_API_KEY
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    async def stream_generator():
        # Convert messages to OpenAI format
        openai_messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        response = await client.chat.completions.create(
            model=MODEL_NAME,
            messages=openai_messages,
            stream=True
        )

        async for chunk in response:
            content = chunk.choices[0].delta.content
            if content:
                yield content

    return StreamingResponse(stream_generator(), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
