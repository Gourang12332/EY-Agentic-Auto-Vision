# Voice-Call-Service
Twilio Voice Interaction API (Flask)
Overview

This service is a Flask-based voice interaction API that uses Twilio Programmable Voice to:

Automatically call a user

Ask for spoken input

Capture speech using Twilio Speech-to-Text

Return the user’s response synchronously to the backend

It behaves like a blocking voice input system, where the API waits until the user speaks or the call ends.

# Tech Stack

Flask – Web framework

Twilio SDK – Voice calling & speech recognition

Flask-CORS – Cross-origin support

python-dotenv – Environment config

threading – Synchronization between call and response

Environment Setup

# Create a .env file:

TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX

Install & run:

pip install flask flask-cors twilio python-dotenv
python app.py

Server runs on:

http://127.0.0.1:5000
Core APIs
Make a Call

POST /make-call

Request:

{
  "number": "+919876543210"
}

This:

Initiates a Twilio call

Asks the user to speak

Waits (blocks) up to 60 seconds

Returns the spoken text

Response:

{
  "status": "success",
  "call_sid": "CAxxxx",
  "user_response": "My name is John"
}
# Voice Logic (Twilio Webhook)

POST /voice-logic

Handles:

Text-to-speech prompt

Starts speech gathering

This endpoint is called by Twilio, not manually.

Handle Recording

POST /handle-recording

Receives:

CallSid

SpeechResult

Stores transcription and unblocks the waiting request.

Call Status

POST /call-status

Handles:

Call ended

No answer

Busy / failed

Ensures the API does not stay blocked forever.

Internal Working (Important)

The system uses a thread synchronization pattern:

When /make-call is triggered
→ A threading.Event() is created
→ API pauses on event.wait()

When user speaks
→ Twilio hits /handle-recording
→ event.set() is called
→ Waiting API resumes and returns data

This creates a synchronous voice input flow over an async system.

# Why This Design

Allows backend to treat voice like normal user input

No polling required

Real-time speech capture

Works well for:

Voice bots

IVR systems

Voice-based authentication

Call-based onboarding flows

# Key Idea

This service converts a phone call into a blocking API input.

# From the backend’s perspective:

HTTP Request → Phone Call → User Speaks → HTTP Response
