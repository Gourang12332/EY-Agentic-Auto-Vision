# AI-Diagnostics-and-CAPA-Service
Vehicle AI Analysis, CAPA Generation & Automated Service Flow
Overview

This service is a FastAPI-based AI backend that performs:

Real-time vehicle diagnostics using LLMs

Automatic service triggering via voice calls

CAPA (Corrective & Preventive Action) generation

PDF report generation for company-wide RCA

It acts as the intelligence layer between sensor data, users, and service automation.

# Tech Stack

FastAPI – REST API framework

Google Gemini (genai) – LLM for diagnostics & CAPA

MongoDB Atlas – Logs & vehicle data

ReportLab – PDF generation

httpx – Async service orchestration

Twilio Calling Service – Voice confirmation flow

python-dotenv – Environment config

# Environment Setup

Create a .env file:

GEMINI_API_KEY=your_key
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/

Install & run:

pip install -r requirements.txt
uvicorn main:app --reload

Swagger UI:

http://127.0.0.1:8000/docs
Core APIs
Analyze Vehicle (Main AI Entry Point)

POST /analyze

Request:

{
  "userId": "USR001",
  "vehicleId": "TOYOTA_123",
  "sensors": { ... }
}

This endpoint:

Sends sensor data to Gemini

Gets fault predictions

Updates vehicle state in DB

Logs all detected issues

Triggers automated service if risk is high

Generate Company CAPA

GET /capa/{vehicle_id}

Generates:

Company-wide CAPA from all ISSUE logs

Returns a downloadable PDF report

Uses:

LLM-generated root causes

Corrective & preventive actions

Risk assessment and summary

Start Automated Service

POST /start-automated-service

Request:

{
  "number": "+919876543210",
  "vehicleId": "TOYOTA_123",
  "issue": "Brake Failure"
}

Triggers:

Voice call to user

Captures spoken decision

Automatically books service if confirmed

System Flow

Sensors sent to /analyze

LLM predicts failures

Issues logged in MongoDB

High risk → voice call triggered

User confirms via call

Service booking happens automatically

RCA logs used to generate CAPA PDF

CAPA Engine

The CAPA system works by:

Collecting all ISSUE logs for a company

Feeding them into Gemini

Generating structured RCA output

Converting it into a professional PDF

This allows real-world quality teams to get instant RCA reports.

Why This System

Converts raw sensor data into decisions

Fully automated service workflow

Real CAPA generation using production logs

No manual analysis required

Suitable for:

Predictive maintenance systems

Fleet management platforms

Automotive OEM dashboards

Quality engineering tools

# Key Idea

This service turns AI predictions into real-world actions.

It is not just analytics — it is a closed-loop system:

Sensors → AI → Logs → Voice → Booking → CAPA → Quality Intelligence
