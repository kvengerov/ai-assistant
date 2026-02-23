# TestNgAi

A full-stack AI chat application built with Angular 21 (frontend) and FastAPI (backend), designed to connect with local AI models via LM Studio.

## Overview

This project provides a real-time chat interface that communicates with local LLM (Large Language Model) servers using the OpenAI-compatible API. It supports streaming responses for an interactive chat experience.

## Tech Stack

- **Frontend**: Angular 21 with TypeScript
- **Backend**: FastAPI (Python)
- **AI Model**: Qwen/Qwen3-VL-4B (via LM Studio)
- **Containerization**: Docker & Docker Compose

## Project Structure

```
test-ng-ai/
├── backend/               # FastAPI backend
│   ├── src/
│   │   └── main.py       # Main API application
│   ├── requirements.txt  # Python dependencies
│   └── start.sh          # Startup script
├── frontend/             # Angular frontend
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       │   └── ai-chat/    # Chat component
│   │       └── services/
│   │           └── ai-service.ts  # API service
│   └── package.json
├── docker-compose.yml    # Development environment
├── docker-compose.prod.yml  # Production environment
└── package.json          # Monorepo scripts
```

## Prerequisites

- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- LM Studio (running locally with OpenAI-compatible API)

## Configuration

### Backend Environment

Create a `.env` file in the `backend/` directory based on `.env.example`:

```env
LM_STUDIO_URL=http://192.168.0.230:1234/v1
LM_STUDIO_API_KEY=lm-studio
MODEL_NAME=qwen/qwen3-vl-4b
```

### Docker Environment

Docker Compose uses default values for LM Studio settings. To customize, create a `.env` file in the project root:

```env
LM_STUDIO_URL=http://192.168.0.230:1234/v1
LM_STUDIO_API_KEY=lm-studio
MODEL_NAME=qwen/qwen3-vl-4b
```

### LM Studio Setup

1. Download and install [LM Studio](https://lmstudio.ai/)
2. Start LM Studio and download the Qwen/Qwen3-VL-4B model
3. Start the local server on port 1234

## Running the Application

### With Docker (Development)

```bash
npm start
```

This starts both the frontend (port 4200) and backend (port 3000).

### With Docker (Production)

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Local Development

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python src/main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## API Endpoints

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| POST   | /api/chat  | Send chat message        |

### Chat Request Format

```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

## Features

- Real-time streaming AI responses
- Conversation history persistence
- Docker support for easy deployment
- Angular Signals for reactive state management

## License

ISC
