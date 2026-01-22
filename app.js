require("dotenv").config();
const express = require("express");
const geocodeRoute = require("./routes/geocode");
const app = express();

app.use(express.static("public"));
app.use(express.json());

// routes
app.use("/weather", require("./routes/weather"));
app.use("/geocode", geocodeRoute);
app.use("/route", require("./routes/directions"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
