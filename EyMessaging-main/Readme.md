# WhatsApp-Service-Booking-Orchestrator
Automated Vehicle Service Booking via WhatsApp
Overview

This service acts as a real-time service booking orchestrator that:

Receives vehicle anomaly alerts

Finds relevant service centers

Sends interactive WhatsApp menus

Captures user reply

Calls external booking API

Confirms booking back to the user

It bridges AI diagnostics systems with real-world service operations.

# Tech Stack

FastAPI – API framework

MongoDB Atlas – Session & service center storage

Twilio WhatsApp API – User interaction layer

httpx – External API calls

python-dotenv – Environment config

# Environment Setup

Create a .env file:

MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token

Install & run:

pip install -r requirements.txt
uvicorn main:app --reload

Webhook URL for Twilio:

POST /sms-reply
Core APIs
Sensor Anomaly Trigger

POST /sensor-anomaly

Called by the AI system when an issue is detected.

Request:

{
  "vehicle_id": "TOYOTA_123",
  "issue_detected": "Brake Pad Wear"
}

This endpoint:

Finds vehicle owner

Fetches company service centers

Builds WhatsApp menu

Saves session in MongoDB

Sends interactive message

WhatsApp Reply Handler

POST /sms-reply

Triggered by Twilio when user replies.

# Flow:

Reads user choice

Maps selection to service center

Generates booking payload

Calls external booking API

Sends confirmation message

# System Flow

AI detects anomaly

/sensor-anomaly is called

WhatsApp menu sent to user

User replies with option

/sms-reply processes choice

External booking API is called

User receives booking confirmation

External Integration

This service calls:

POST https://booking-and-log-service-ey.onrender.com/book-service

Payload includes:

vehicleId

userId

serviceCenterId

scheduled time

confirmation code

Why This System

This service enables:

Zero manual service booking

Real-time customer interaction

Multi-company service routing

Session-based WhatsApp workflows

Plug-and-play with any AI system

# Key Idea

This system converts AI alerts into real-world service bookings.

It acts as the action layer of the entire platform:

AI → Alert → WhatsApp → User → Booking API → Service Center
