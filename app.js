require("dotenv").config();
const express = require("express");
const geocodeRoute = require("./routes/geocode");
const trafficRoute = require("./routes/traffic");
const weatherRoute = require("./routes/weather");
const directionsRoute = require("./routes/directions");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// routes
app.use("/weather", weatherRoute);
app.use("/geocode", geocodeRoute);
app.use("/route", directionsRoute);
app.use("/traffic", trafficRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
