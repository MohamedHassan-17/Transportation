let weatherInfo;
const weatherDiv = document.getElementById("weather");
const scoreDiv = document.getElementById("score");

// button click
document.getElementById("checkBtn").addEventListener("click", async () => {
  const place = document.getElementById("placeInput").value.trim();

  if (!place) {
    alert("Please enter a place name");
    return;
  }

  try {
    const geoRes = await fetch(`/geocode?place=${encodeURIComponent(place)}`);
    const geoData = await geoRes.json();

    if (geoData.error) {
      alert(geoData.error);
      return;
    }

    const { lat, lon } = geoData;

    const weatherRes = await fetch(`/weather?lat=${lat}&lon=${lon}`);
    const weatherData = await weatherRes.json();

    checkWeather(weatherData);
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
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
