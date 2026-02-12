# Fleet-Dashboard-Service
User, Vehicle & Logs API (FastAPI + MongoDB)
Overview

This service is a FastAPI-based backend for managing:

Users

Vehicles (Fleet)

Real-time vehicle sensor data

AI predictions per vehicle

System logs (bookings & issues)

It acts as the core dashboard backend for a vehicle monitoring system.

# Tech Stack

FastAPI – REST API framework

MongoDB Atlas – Database

Motor – Async MongoDB driver

Pydantic – Data validation

python-dotenv – Environment config

certifi – SSL support for MongoDB Atlas

CORS Middleware – Frontend integration

# Environment Setup

Create a .env file:

MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/

Install & run:

pip install -r requirements.txt
uvicorn main:app --reload

# Swagger UI:

http://127.0.0.1:8000/docs
Database Collections
Collection	Purpose
users	User profiles
vehicles	Vehicle fleet data
logs	Booking & issue history
Core APIs
Users

POST /create-user – Create a new user

Vehicles

POST /add-vehicle – Add vehicle to user fleet

GET /get-dashboard/{user_id} – Get full user dashboard

Returns:

User profile

All vehicles

Sensor data

AI predictions

Logs System

POST /add-log – Save booking/issue log

GET /get-logs/{vehicle_id} – Get vehicle logs

Logs are stored in a flexible schema and sorted by latest first.

# Data Model Highlights
Vehicle Schema Includes

Status flags (OK / ALERT)

10 real-time sensor values

AI predictions (component, issue, days left, certainty)

Summary message

This allows the frontend to render a complete health dashboard from a single API.

System Flow

User is created

Vehicles are linked to user

Sensors & AI predictions update vehicle state

Logs track:

Service bookings

Detected issues

Dashboard shows full fleet health

Why This Design

Clean separation: Users vs Vehicles vs Logs

Real-time fleet monitoring ready

AI-ready schema (predictions field)

# Works for:

Fleet systems

Insurance platforms

Smart vehicle apps

Predictive maintenance dashboards

# Key Idea

This service is the single source of truth for user and vehicle state.

It provides a structured backend layer for any system doing:
vehicle health → AI prediction → service decisions → audit logs.
