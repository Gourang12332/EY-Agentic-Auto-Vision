# Admin-EY-main

Admin & Vendor Traceability API

Overview

This is a FastAPI-based Admin Backend for managing:

Service Centers

Vendors (Suppliers)

Supply Batches

Part Failures (RCA)

Vendor Analytics

The system provides end-to-end traceability of parts from vendor to failure, enabling real-world supplier quality analysis.

Tech Stack

FastAPI – REST API framework

MongoDB – Database

Motor – Async MongoDB driver

Pydantic – Data validation

python-dotenv – Environment config

Environment Setup

Create a .env file:

MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
DB_NAME=auto_ai_db

Install & run:

pip install -r requirements.txt
uvicorn main:app --reload

Swagger:

http://127.0.0.1:8000/docs
Database Collections
Collection	Purpose
service_centers	Service center profiles
vendors	Vendor/supplier data
batches	Supply batch logs
Core APIs
Service Centers

POST /register-center – Register center

GET /get-all-centers – List centers

GET /get-center-details/{id} – Center by ID

GET /get-center-by-name/{name} – Center by name

Vendors & Supply Chain

POST /register-vendor – Register supplier

POST /add-batch – Log supply batch

POST /report-failure – Report failed part

GET /vendor-analytics/{vendor_id} – Vendor RCA stats

GET /get-all-vendors – List vendors

RCA Flow (Main Logic)

Vendor supplies parts → add-batch

Part fails at service center → report-failure

Batch failure count updates

Vendor durability score recalculated

Management sees low-quality vendors automatically

Vendor Durability Formula
Score = ((Total Supplied - Total Failed) / Total Supplied) * 100

This score is derived from real failures, not manual ratings.

Why This System

Real-world part traceability

Automatic vendor quality scoring

RCA-ready architecture

Easily extendable to recalls, blacklisting, AI models

Key Idea

Every failed part improves supplier intelligence.
This backend acts as a vendor quality & RCA engine, not just CRUD APIs.
