const express = require("express");
const { ORS_API_KEY, WEATHER_API_KEY } = process.env;
const path = require("path");
const fetch = require("node-fetch");

require("dotenv").config();




const app = express();
const PORT = process.env.PORT || 3000;



// Serve frontend files
app.use(express.static("public"));

// Optional: serve JSON file explicitly
app.get("/testjson", (req, res) => {
  res.sendFile(path.join(__dirname, "seejson.txt"));
});

app.get("/route", async (req, res) => {
  const { start, end, mode = "driving-car" } = req.query;

  const url = `https://api.openrouteservice.org/v2/directions/${mode}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": process.env.ORS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        coordinates: [
          start.split(",").map(Number),
          end.split(",").map(Number)
        ]
      })
    });

    const text = await response.text();

    console.log("STATUS:", response.status);
    console.log("ORS RESPONSE:", text);

    res.status(response.status).send(text);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`the json file http://localhost:${PORT}/testjson`);
});



//weather api 

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat and lon are required" });
  }

  try {
    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?lat=${lat}&lon=${lon}` +
      `&appid=${process.env.WEATHER_API_KEY}` +
      `&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// End of weather api
