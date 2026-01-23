# 🚗 Transportation Safety Analyzer

## 📌 Problem Statement

Drivers often make travel decisions without understanding how weather conditions and travel distance affect road safety.  
Poor visibility, heavy rain, strong winds, and long driving distances significantly increase accident risk, yet this information is rarely combined into a single, easy-to-understand metric.

This project aims to solve that problem by providing a **Safety Score** for a trip between two locations, helping users make safer travel decisions.

---

## 🎯 Solution Overview

The **Transportation Safety Analyzer**:

- Accepts a **start and end location** (city/place names)
- Converts place names into geographic coordinates (**geocoding**)
- Fetches **real-time weather data** for both locations
- Calculates **travel distance and duration**
- Computes a **Safety Score (0–100)** based on:
  - Weather conditions
  - Visibility
  - Wind speed
  - Rainfall
  - Distance traveled
- Displays all results in a simple web interface

---

## 🛠 Technologies Used

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express.js

### APIs
- **OpenWeatherMap API** (Weather + Geocoding)
- **OpenRouteService API** (Distance & travel time)

---

## ⚙️ How It Works

1. User enters a **start** and **end** location
2. Locations are geocoded into latitude & longitude
3. Weather data is fetched for both locations
4. Distance and travel time are calculated
5. A safety score is computed
6. Results are displayed to the user

---

## 🧮 Safety Score Logic

The Safety Score starts at **100** and is reduced based on:

### Weather
- Low visibility
- High wind speeds
- Rainfall intensity

### Distance
- Longer trips reduce safety due to driver fatigue
- Short trips have minimal impact

Final score is clamped between **0 and 100**.


