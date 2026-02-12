# SMS-Alert-Service-Selector
Vehicle Anomaly Alert & Service Center Recommendation API
Overview

This service is responsible for notifying vehicle owners via SMS when an anomaly is detected and providing them with a list of nearby service centers to take action.

It acts as the notification layer between an AI diagnostic system and the end user.

# Tech Stack

FastAPI – REST API framework

MongoDB Atlas – Service center database

Twilio SMS API – Message delivery

Motor – Async MongoDB driver

Pydantic – Data validation

python-dotenv – Environment configuration

# Environment Setup

Create a .env file:

MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
DB_NAME=auto_ai_db
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890

Install & run:

pip install -r requirements.txt
uvicorn main:app --reload

# Swagger UI:

http://127.0.0.1:8000/docs
Database Collection
Collection	Purpose
service_centers	Stores company service centers
Core API
Sensor Anomaly Trigger

POST /sensor-anomaly

This endpoint is called by the AI system when a vehicle issue is detected.

Request Body:

{
  "vehicle_id": "TOYOTA_123",
  "issue_detected": "Engine Overheating",
  "owner_phone": "+919876543210"
}
What This API Does

When /sensor-anomaly is called:

Extracts company name from vehicle ID

Fetches matching service centers from MongoDB

Builds an interactive SMS menu

Sends message to vehicle owner via Twilio

Example SMS Sent to User
ALERT: Engine Overheating detected in TOYOTA_123.


Select a TOYOTA Service Center:
1. Toyota Service Mumbai (Andheri)
2. Toyota Service Pune (Wakad)


Reply with the center number to book an appointment immediately.
System Role

This service works as:

AI Detection → SMS Notification → User Action

It does not perform booking itself.
It only notifies and routes the user to service centers.

# Why This System

This API enables:

Real-time customer alerts

Automatic service center discovery

Zero manual intervention

Plug-and-play with any AI model

Scalable notification layer

# Key Idea

This service converts machine intelligence into human action.
