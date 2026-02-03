// src/lib/api.ts
import axios from 'axios';

// Connect to your Python Backend
const API_URL = "https://carapi-2goc.onrender.com";

export const api = {
  
  // 1. LOGIN (Existing)
  login: async (userId: string, phone: string) => {
    try {
      const response = await axios.get(`${API_URL}/get-dashboard/${userId}`);
      if (response.data && response.data.user_profile.phone === phone) {
        return { success: true, user: response.data.user_profile };
      } else {
        return { success: false, message: "Invalid Phone Number" };
      }
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, message: "User ID not found" };
    }
  },

  // 2. GET DASHBOARD (This was missing!)
  getDashboard: async (userId: string) => {
    try {
      // This fetches User Profile + Fleet Data
      const response = await axios.get(`${API_URL}/get-dashboard/${userId}`);
      return response.data;
    } catch (error) {
      console.error("API Error (Dashboard):", error);
      return null;
    }
  },

  // 3. ADD VEHICLE (For future use)
  addVehicle: async (vehicleData: any) => {
    try {
      const response = await axios.post(`${API_URL}/add-vehicle`, vehicleData);
      return response.data;
    } catch (error) {
      console.error("API Error (Add Vehicle):", error);
      return null;
    }
  },

  // 4. UPDATE SENSOR (For simulation button)
  updateSensor: async (vehicleId: string, updates: any) => {
    try {
      const response = await axios.post(`${API_URL}/update-sensor`, {
        vehicleId: vehicleId,
        updates: updates
      });
      return response.data;
    } catch (error) {
      console.error("API Error (Update Sensor):", error);
      return null;
    }
  }
};