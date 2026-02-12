# AI-Powered Vehicle Diagnostic & Service Automation System

(EY Techathon / EY Innovation Challenge Submission)

Overview

This project is an end-to-end AI-driven vehicle health monitoring, service automation, and vendor intelligence platform, developed as part of an EY technology/innovation submission.

It not only handles vehicle diagnostics and automated service booking, but also includes a global vendor rating and recommendation system for enterprises to identify the best-performing service partners.

The platform connects vehicles, service centers, vendors, and companies into one intelligent ecosystem.

# Core Idea

The core idea is to convert raw operational data into automated enterprise decisions.

Instead of isolated systems, this platform unifies:

Vehicle health monitoring

AI-based fault prediction

Automated service execution

Vendor performance analytics

Global vendor intelligence

All driven by AI and real-time data.

In short:
Machine Intelligence → Operational Automation → Enterprise Optimization

What the System Does

At a high level, the platform provides:

Vehicle & Service Layer

AI-based vehicle fault detection

Predictive maintenance insights

Automatic service decision making

Voice call automation to users

WhatsApp/SMS based booking

Service center recommendation

Centralized logging and monitoring

Vendor Intelligence Layer (Company Side)

Vendor onboarding and profiling

Vendor performance scoring

Service quality rating system

Company-wise vendor analytics

Global vendor database

AI-based vendor recommendations

Best-vendor suggestion for new companies

# Architecture (Conceptual)
Vehicle Sensors
      ↓
AI Diagnostic Engine
      ↓
Service Automation Layer
(Calls + WhatsApp + Booking)
      ↓
Service Centers
      ↓
Vendor Performance Logs
      ↓
Vendor Intelligence Engine
      ↓
Global Vendor Database
      ↓
Best Vendor Recommendations
      ↓
Companies / Enterprises
# Tech Stack
Backend & APIs

FastAPI (Python)

Uvicorn

HTTPX / Requests

AI & ML

Google Gemini (LLM)

Custom ML models for prediction

Prompt engineering for structured outputs

AI-based recommendation logic

Databases

MongoDB Atlas

Motor (async MongoDB)

PyMongo

Communication & Automation

Twilio (Voice + WhatsApp)

Automated call agents

Messaging workflows

Reporting & Documents

ReportLab (PDF generation)

CAPA report automation

Vendor analytics reports

Infrastructure

Docker

Render (cloud deployment)

Environment-based configuration

# Key Components
1. AI Diagnostic Engine

Processes live sensor data and outputs:

Faulty components

Issue classification

Severity level

Remaining life prediction

Service recommendation

2. Service Automation Engine

Automatically:

Calls vehicle owners

Collects user decisions

Sends service options

Books appointments

Generates confirmation

3. Booking & Logging System

Maintains:

Service history

Issue logs

Booking logs

Vehicle lifecycle data

4. CAPA Generator (Company Level)

Uses historical logs to:

Identify systemic root causes

Generate corrective actions

Generate preventive actions

Produce company-level CAPA PDFs

5. Vendor Intelligence System (Enterprise Feature)

This is the company-side strategic layer.

It:

Tracks vendor performance across companies

Maintains ratings for:

Response time

Service quality

Resolution success

Customer feedback

Builds a global vendor database

Uses analytics + AI to:

Rank vendors

Recommend best vendors

Suggest optimal partners to new companies

This enables companies to make data-driven vendor decisions instead of manual selection.

# Why This System Matters (EY Context)

Most current systems are:

Siloed

Reactive

Manual

Dashboard-only

This system is:

Autonomous

Predictive

AI-driven

Enterprise scalable

Decision-oriented

It directly aligns with EY’s focus on:

Digital transformation

Intelligent automation

Data-driven decision systems

Enterprise AI platforms

Use Cases
Operational

Smart vehicles

Fleet management

Logistics companies

Insurance platforms

Enterprise / Strategic

Automotive manufacturers

Service aggregators

Enterprise vendor management

Quality assurance systems

Vendor benchmarking platforms

# Final Vision

This platform represents a full-stack autonomous enterprise system where:

Vehicles self-diagnose

AI predicts failures

Services are booked automatically

Vendors are continuously evaluated

Companies get the best vendors globally

Decisions are optimized using real data

The long-term vision is to build a global AI-powered service and vendor intelligence network that connects:

Vehicles → Services → Vendors → Companies → Enterprise Strategy
