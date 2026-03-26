# CareLink AI Nurse — Backend Integration Guide

## Overview
The AI Nurse is a symptom analysis system built by the AI Engineer.
It accepts patient symptom descriptions and returns structured medical data.

## AI Server
The AI runs as a standalone Express server.
Location: /ai-nurse/server.js
Port: 5000 (default)

To start the AI server:
cd ai-nurse
node server.js

## Endpoint

POST http://localhost:5000/ai/intake

Request body:
{
  "userInput": "I have chest pain and difficulty breathing"
}

Success response:
{
  "success": true,
  "data": {
    "symptoms": ["chest pain", "difficulty breathing"],
    "duration": "unknown",
    "severity": "severe",
    "urgency_level": "high",
    "recommended_specialty": "cardiology",
    "follow_up_question": null,
    "summary": "Patient reports chest pain and breathing difficulty"
  }
}

Follow-up response (when input is vague):
{
  "success": true,
  "data": {
    "symptoms": [],
    "follow_up_question": "Can you describe where the pain is and how long it has been going on?",
    "urgency_level": "low",
    "recommended_specialty": "general medicine"
  }
}

Error response:
{
  "success": false,
  "message": "error description"
}

## Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| symptoms | array | List of detected symptoms |
| duration | string | How long symptoms have been present |
| severity | string | mild, moderate, or severe |
| urgency_level | string | low, medium, or high |
| recommended_specialty | string | Medical specialty to match doctor |
| follow_up_question | string or null | Clarifying question if input is vague |
| summary | string | One sentence summary for the doctor |

## Doctor Matching
Use recommended_specialty to filter doctors from the database.
Example: if recommended_specialty is "cardiology", show cardiologists first.

## Urgency Logic
- high → flag consultation as urgent, notify emergency contacts
- medium → standard consultation flow
- low → routine appointment flow

## Environment Variables needed in ai-nurse/.env
GROQ_API_KEY=your_groq_api_key_here

## CORS
The AI server allows all origins in development.
In production, restrict CORS to your backend domain only.

## Notes
- The AI uses llama-3.3-70b via Groq API
- Response time is typically 1-3 seconds
- Always handle follow_up_question — if not null, ask the patient before proceeding
- The AI server must be running alongside the main backend server