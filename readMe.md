# 🚦 Transportation Weather & Safety Scorer

This is a lightweight Node.js + Express app that helps determine **how safe it is to travel** based on:
- Weather conditions (from OpenWeather)
- Distance and routing (from OpenRouteService)
- User-entered coordinates or place names
- A customizable safety score (e.g., for boda/motorcycle travel)

This is ideal for:
- Riders
- Delivery drivers
- Commuters
- Travel planning tools

---

## 📦 Features

✔ Fetch live weather by coordinates or place name  
✔ Fetch routing data (distance + duration) via OpenRouteService  
✔ Calculate a **weather safety score**  
✔ Designed for future expansion (traffic, UI maps, etc.)  
✔ Clear separation of backend routes

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MohamedHassan-17/Transportation.git
cd Transportation
2. Install dependencies
npm install

3. Create a .env file

At the project root, create .env with:

OPENWEATHER_API_KEY=your_openweather_api_key
ORS_API_KEY=your_openrouteservice_api_key
PORT=3000