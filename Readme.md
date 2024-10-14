# Chatbot Model Evaluation Backend

## Overview

This project provides a backend service for evaluating chatbot interactions. Users can submit conversation histories, user questions, bot answers, and context, and the system evaluates the chatbot's performance based on various metrics. The results include evaluation scores and recommendations generated using OpenAI's API.

## Technologies Used

- Node.js
- Express.js
- Axios (for making API calls to OpenAI)
- dotenv (for managing environment variables)
- JSON for structured data responses

## Features

- **Evaluate Inputs**: Users can submit chatbot interaction details for evaluation.
- **Analyze Data**: Utilizes OpenAI's API to analyze the provided inputs and generate evaluation scores and recommendations.
- **Metrics-Based Evaluation**: Allows users to specify which metrics to evaluate (e.g., clarity, coherence).
- **JSON Output**: Provides structured responses in JSON format.
- **Display Charts**: Provides visuallly presentable metrics to analyze.

## Getting Started

### Prerequisites

- Node.js
- Git
- OpenAI API key

### Installation

1. **Clone the repository**:

   git clone https://github.com/jagadeeshmurali-coder/modelevaluationserv.git
   cd modelevaluationserv

2. **Install Dependencies**:

    npm install

3. **Set up environment variables: Create a .env file in the root directory and add your OpenAI API key.**:

    OPENAI_API_KEY=your_openai_api_key_here

4. **Start the server**:

     node server.js     

    The server will run on http://localhost:5000.   

## API Endpoints

### POST /evaluate

**Description: Evaluates the chatbot inputs.**

**Request Body:**
{
  "conversationHistory": "string",
  "userQuestion": "string",
  "botAnswer": "string",
  "context": "string",
  "metrics": "JSON stringified object"
}

**Response:**
{
  "message": "Evaluation data processed successfully",
  "data": {
    "conversationHistory": "...",
    "userQuestion": "...",
    "botAnswer": "...",
    "context": "...",
    "metrics": "..."
  }
}

### POST /analyze
**Description: Analyzes the evaluation data using OpenAI.**

**Request Body:**
{
  "conversationHistory": "string",
  "userQuestion": "string",
  "botAnswer": "string",
  "context": "string",
  "metrics": "JSON stringified object"
}

**Response:**
{
  "message": "Analysis completed successfully",
  "result": {
    "result": {
      "Coherence": { ... },
      "Clarity": { ... }
    },
    "recommendations": "Your recommendation message here."
  }
}

### Example Requests

Here is an example of how to make a request to the evaluate endpoint using curl:

curl -X POST http://localhost:5000/evaluate \
-H "Content-Type: application/json" \
-d '{
  "conversationHistory": "Hello, how can I help you?",
  "userQuestion": "What is the weather like?",
  "botAnswer": "It's sunny and warm.",
  "context": "User inquires about the weather.",
  "metrics": "{\"clarity\": true, \"coherence\": true}"
}'

And an example for the analyze endpoint:

curl -X POST http://localhost:5000/analyze \
-H "Content-Type: application/json" \
-d '{
  "conversationHistory": "Hello, how can I help you?",
  "userQuestion": "What is the weather like?",
  "botAnswer": "It's sunny and warm.",
  "context": "User inquires about the weather.",
  "metrics": "{\"clarity\": true, \"coherence\": true}"
}'

