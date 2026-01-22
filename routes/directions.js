const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/", async (req, res) => {
  const { start, end, mode = "driving-car" } = req.query;

  if (!start || !end) {
    return res.status(400).json({ error: "start and end are required" });
  }

  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/${mode}`,
      {
        method: "POST",
        headers: {
          Authorization: process.env.ORS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          coordinates: [
            start.split(",").map(Number),
            end.split(",").map(Number)
          ]
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
