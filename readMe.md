Transportation Safety Analyzer

📌 Problem Statement

Drivers often make travel decisions without understanding how weather conditions and travel distance affect road safety. Poor visibility, heavy rain, strong winds, and long driving distances significantly increase accident risk, yet this information is rarely combined into a single, easy-to-understand metric.

This project aims to solve that problem by providing a Safety Score for a trip between two locations, helping users make safer travel decisions.


🎯 Solution Overview

The Transportation Safety Analyzer:

Accepts a start and end location (city/place names)

Converts place names into geographic coordinates (geocoding)

Fetches real-time weather data for both locations

Calculates a safety score based on:

Visibility

Wind speed

Rain intensity

Travel distance

Displays:

Weather conditions

Distance between locations

Estimated safety score

The final score reflects the average safety of both locations, adjusted by travel distance.
🛠️ Technologies Used
Frontend

HTML

CSS

JavaScript (Vanilla)

Backend

Node.js

Express.js

APIs

OpenWeatherMap API

Geocoding API (place → coordinates)

Weather API (current conditions)


🧠 How It Works (Technical Flow)

User enters a start and end location

Frontend sends requests to /geocode

Backend converts place names into coordinates

Weather data is fetched for both locations

Distance is calculated using the Haversine formula

Individual safety scores are calculated

Scores are averaged and adjusted based on distance

Results are displayed to the user

📏 Safety Score Logic
Base Score

Starts at 100

Weather Adjustments

Visibility penalties for fog or haze

Wind penalties for unsafe speeds

Rain penalties for slippery conditions

Distance Adjustment

Longer distances reduce the score gradually

Short trips still incur a minimum risk penalty

This creates a realistic safety estimate rather than a simple yes/no output.