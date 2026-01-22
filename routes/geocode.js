const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/", async (req, res) => {
  const { place } = req.query;

  if (!place) {
    return res.status(400).json({ error: "Place name required" });
  }

  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      place
    )}&limit=1&appid=${process.env.WEATHER_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.length) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json({
      name: data[0].name,
      lat: data[0].lat,
      lon: data[0].lon,
      country: data[0].country
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
