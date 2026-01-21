const express = require("express");
const ORS_API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwMTc2MjRlOWE1YzQ1ZjZhM2U5OWUxMzRiYTIyOTJkIiwiaCI6Im11cm11cjY0In0=";
const path = require("path");
const fetch = require("node-fetch");



const app = express();
const PORT = 3000;



// Serve frontend files
app.use(express.static("public"));

// Optional: serve JSON file explicitly
app.get("/testjson", (req, res) => {
  res.sendFile(path.join(__dirname, "seejson.txt"));
});

app.get("/route", async (req, res) => {
  const { start, end, mode = "driving-car" } = req.query;

  try {
    const url = `https://api.openrouteservice.org/v2/directions/${mode}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": ORS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        coordinates: [
          start.split(",").map(Number),
          end.split(",").map(Number)
        ]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`the json file http://localhost:${PORT}/testjson`);
});



//map
