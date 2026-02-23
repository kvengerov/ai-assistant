from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import AsyncOpenAI
import asyncio
import os

app = FastAPI()
client = AsyncOpenAI(
    base_url="http://192.168.0.230:1234/v1",
    api_key="lm-studio"  # Required but not used for local server
)

class ChatRequest(BaseModel):
    prompt: str

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    async def stream_generator():
        response = await client.chat.completions.create(
            model="qwen/qwen3-vl-4b",
            messages=[{"role": "user", "content": request.prompt}],
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
