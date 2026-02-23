#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Copy .env.example to .env and add your OPENAI_API_KEY"
fi

# Activate virtual environment and start the server
source venv/bin/activate
python -m uvicorn src.main:app --host 0.0.0.0 --port 3000 --reload
