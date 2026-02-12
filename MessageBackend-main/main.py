from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from twilio.rest import Client
import os
from dotenv import load_dotenv

load_dotenv()

# --- CONFIGURATION ---
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "auto_ai_db")

TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE = os.getenv("TWILIO_PHONE_NUMBER")

# 1. Initialize FastAPI App (This was missing!)
app = FastAPI()

# 2. Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Connect to Database (This is needed for admin_collection)
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
admin_collection = db.service_centers  # Used in your new endpoint

# 4. Initialize Twilio Client
twilio_client = Client(TWILIO_SID, TWILIO_TOKEN) if TWILIO_SID else None

# --- MODELS ---
class SensorAlert(BaseModel):
    vehicle_id: str         
    issue_detected: str     
    owner_phone: str        

# --- NEW API ENDPOINT ---
# --- NEW API ENDPOINT ---
@app.post("/sensor-anomaly")
async def sensor_anomaly_alert(alert: SensorAlert):
    if not twilio_client:
        print("❌ DEBUG: Twilio Client is None. Check env variables.")
        raise HTTPException(status_code=500, detail="Twilio not configured")

    try:
        company_name = alert.vehicle_id.split("_")[0] 
    except IndexError:
        raise HTTPException(status_code=400, detail="Invalid Vehicle ID format")

    centers_cursor = admin_collection.find({
        "company_name": {"$regex": f"^{company_name}", "$options": "i"}
    })
    
    centers = await centers_cursor.to_list(length=5)

    if not centers:
        print(f"⚠️ DEBUG: No centers found for company: {company_name}")
        return {"status": "warning", "message": f"No service centers found for {company_name}"}

    menu_text = f"🚨 ALERT: {alert.issue_detected} detected in {alert.vehicle_id}.\n\n"
    menu_text += f"Select a {company_name} Service Center:\n"
    
    for index, center in enumerate(centers, 1):
        menu_text += f"{index}. {center['name']} ({center['location']})\n"
    
    menu_text += "\nReply with the center number to book an appointment immediately."

    # --- ✅ DEBUG PRINTS (Look at your terminal) ---
    print(f"\n--- 🐛 DEBUGGING SMS ---")
    print(f"TO (Owner):   '{alert.owner_phone}'")
    print(f"FROM (Twilio): '{TWILIO_PHONE}'")
    print(f"MESSAGE LEN:  {len(menu_text)} chars")
    print(f"CONTENT:      \n{menu_text}")
    print(f"------------------------\n")

    try:
        message = twilio_client.messages.create(
            body=menu_text,
            from_=TWILIO_PHONE,
            to=alert.owner_phone
        )
        print(f"✅ SUCCESS: Message SID: {message.sid}")
        return {
            "status": "success", 
            "message": "SMS sent to owner", 
            "sid": message.sid, 
            "centers_found": len(centers)
        }
    except Exception as e:
        print(f"❌ ERROR: Twilio failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send SMS: {str(e)}")