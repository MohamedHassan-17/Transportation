let weatherInfo;
const weatherDiv = document.getElementById("weather");
const scoreDiv = document.getElementById("score");

// button click
document.getElementById("checkBtn").addEventListener("click", () => {
  const input = document.getElementById("coordsInput").value.trim();

  if (!input.includes(",")) {
    alert("Use format: latitude,longitude");
    return;
  }

  const [latStr, lonStr] = input.split(",");
  const lat = parseFloat(latStr);
  const lon = parseFloat(lonStr);

  if (isNaN(lat) || isNaN(lon)) {
    alert("Coordinates must be numbers");
    return;
  }

  getWeather(lat, lon);
});

// fetch weather
async function getWeather(lat, lon) {
  const res = await fetch(`/weather?lat=${lat}&lon=${lon}`);
  const data = await res.json();

  console.log("WEATHER:", data);
  checkWeather(data);
}

// calculate & display weather + score
function checkWeather(data) {
  let score = 100;

  const weatherDescription = data.weather[0].description;
  const temperatureC = data.main.temp;
  const visibility = data.visibility;
  const windSpeed = data.wind.speed;
  const rain1h = data.rain ? data.rain["1h"] || 0 : 0;

  weatherDiv.innerHTML = `
    <h2>Current Weather: ${weatherDescription}</h2>
    <h2>Temperature: ${temperatureC} °C</h2>
    <h2>Visibility: ${visibility} meters</h2>
    <h2>Wind Speed: ${windSpeed} m/s</h2>
    <h2>Rain (last 1h): ${rain1h} mm</h2>
  `;

  // visibility
  if (visibility < 3000) score -= 45;
  else if (visibility < 5000) score -= 20;
  else if (visibility < 8000) score -= 5;

  // wind
  if (windSpeed > 10) score -= 45;
  else if (windSpeed >= 7) score -= 25;
  else if (windSpeed >= 4) score -= 10;

  // rain
  if (rain1h > 2) score -= 40;
  else if (rain1h > 1) score -= 20;
  else if (rain1h > 0.5) score -= 10;

  score = Math.max(0, score);

  scoreDiv.innerHTML = `<h2>Safety Score: ${score}</h2>`;
}
