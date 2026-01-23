// ===============================
// DOM ELEMENTS
// ===============================
const weatherDiv = document.getElementById("weather");
const scoreDiv = document.getElementById("score");
const checkBtn = document.getElementById("checkBtn");

// ===============================
// BUTTON CLICK
// ===============================
checkBtn.addEventListener("click", async () => {
  const startPlace = document.getElementById("startInput").value.trim();
  const endPlace = document.getElementById("endInput").value.trim();

  if (!startPlace || !endPlace) {
    alert("Please enter both start and end locations");
    return;
  }

  try {
    // -------------------------------
    // GEOCODE BOTH LOCATIONS
    // -------------------------------
    const [startGeoRes, endGeoRes] = await Promise.all([
      fetch(`/geocode?place=${encodeURIComponent(startPlace)}`),
      fetch(`/geocode?place=${encodeURIComponent(endPlace)}`)
    ]);

    const startGeo = await startGeoRes.json();
    const endGeo = await endGeoRes.json();

    if (startGeo.error) {
      alert(`Start location error: ${startGeo.error}`);
      return;
    }

    if (endGeo.error) {
      alert(`End location error: ${endGeo.error}`);
      return;
    }

    // -------------------------------
    // FETCH WEATHER FOR BOTH POINTS
    // -------------------------------
    const [startWeatherRes, endWeatherRes] = await Promise.all([
      fetch(`/weather?lat=${startGeo.lat}&lon=${startGeo.lon}`),
      fetch(`/weather?lat=${endGeo.lat}&lon=${endGeo.lon}`)
    ]);

    const startWeather = await startWeatherRes.json();
    const endWeather = await endWeatherRes.json();

    // -------------------------------
    // CALCULATE SCORES
    // -------------------------------
    const startScore = calculateSafetyScore(startWeather);
    const endScore = calculateSafetyScore(endWeather);
    const averageScore = Math.round((startScore + endScore) / 2);
    const distance = Distance(startGeo, endGeo);
    let adjustedScore = 0;
    if (distance < 200) {
      // Adjust score for short distances
      
      adjustedScore = averageScore - 50;
    }
    else{
      adjustedScore = averageScore - (distance / 10);
    }

    // -------------------------------
    // DISPLAY RESULTS
    // -------------------------------
    weatherDiv.innerHTML = `
      <h2>Start Location Weather</h2>
      <p><strong>Description:</strong> ${startWeather.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${startWeather.main.temp} °C</p>
      <p><strong>Visibility:</strong> ${startWeather.visibility} meters</p>
      <p><strong>Wind Speed:</strong> ${startWeather.wind?.speed} m/s</p>
      <p><strong>Rain (1h):</strong> ${startWeather.rain?.["1h"] || 0} mm</p>

      <h2>End Location Weather</h2>
      <p><strong>Description:</strong> ${endWeather.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${endWeather.main.temp} °C</p>
      <p><strong>Visibility:</strong> ${endWeather.visibility} meters</p>
      <p><strong>Wind Speed:</strong> ${endWeather.wind?.speed} m/s</p>
      <p><strong>Rain (1h):</strong> ${endWeather.rain?.["1h"] || 0} mm</p>

      <h2>Distance between locations: ${distance.toFixed(2)} km</h2>
    `;

    scoreDiv.innerHTML = `
      
      <h1> Route Safety: ${adjustedScore}</h1>
    `;

  } catch (err) {
    console.error(err);
    alert("Something went wrong while fetching data");
  }
});

//calcute distance between two coordinates
function Distance(coords1, coords2) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  const lat1 = coords1.lat;
  const lon1 = coords1.lon;
  const lat2 = coords2.lat;
  const lon2 = coords2.lon;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return c * 6371; // Earth radius in kilometers
}

// ===============================
// SAFETY SCORE CALCULATOR
// ===============================
function calculateSafetyScore(data) {
  let score = 100;

  const visibility = data.visibility ?? 0;
  const windSpeed = data.wind?.speed ?? 0;
  const rain1h = data.rain?.["1h"] ?? 0;

  // Visibility penalties
  if (visibility < 3000) score -= 45;
  else if (visibility < 5000) score -= 20;
  else if (visibility < 8000) score -= 5;

  // Wind penalties
  if (windSpeed > 10) score -= 45;
  else if (windSpeed >= 7) score -= 25;
  else if (windSpeed >= 4) score -= 10;

  // Rain penalties
  if (rain1h > 2) score -= 40;
  else if (rain1h > 1) score -= 20;
  else if (rain1h > 0.5) score -= 10;

  return Math.max(0, score);
}
