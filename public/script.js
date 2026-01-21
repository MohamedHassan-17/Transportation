// fetch("https://api.openweathermap.org/data/2.5/weather?lat=0.3292983698614523&lon=32.581971758913134&appid=0dd8df51c1a419728574563e410d9fde")
//   .then(res => {
//     if (!res.ok) {
//       throw new Error(`HTTP error: ${res.status}`);
//     }
//     return res.json();
//   })
// .then(data => {
//   checkWeather(data);
//   console.log("FETCHED DATA:", data);
// })



//   .catch(err => {
//     console.error("FETCH ERROR:", err);
//   });
let weatherInfo ;
const weatherDiv = document.getElementById("weather");
const scoreDiv = document.getElementById("score");

// calculate how is the weather at the location





fetch("seejson.txt")
  .then(res => res.json())
  .then(data => {
    console.log("LOCAL JSON:", data);
    weatherInfo = data;
    checkWeather(data);
  })
  .catch(err => console.error("Error loading local JSON:", err));


 function checkWeather(data) {
  let score= 100;
    const weatherDescription = data.weather[0].description;
    const temperatureK = data.main.temp;
    const temperatureC = (temperatureK - 273.15).toFixed(2);
    const visibility = data.visibility;
    const windSpeed = data.wind.speed;
    const rain1h = data.rain ? data.rain["1h"] || 0 : 0;

    weatherDiv.innerHTML = `<h2>Current Weather: ${weatherDescription}</h2> 
                            <h2>Temperature: ${temperatureC} °C</h2> 
                            <h2>Visibility: ${visibility} meters</h2> 
                            <h2>Wind Speed: ${windSpeed} m/s</h2> 
                            <h2>Rain (last 1h): ${rain1h} mm</h2>`;

    if (Number(visibility) < 3000) {
      score -= 45;
    }
    else if (Number(visibility) < 5000) {
      score -= 20;
    }
    else if (Number(visibility) < 8000) {
      score -= 5;
    }

    if (Number(windSpeed) > 10) {
      score -= 45;
    }
    else if (Number(windSpeed) >= 7) {
      score -= 25;
    }
    else if (Number(windSpeed) >= 4) {
      score -= 10;
    }

    if (rain1h > 2) {
      score -= 40;
    }
    else if (rain1h > 1) {
      score -= 20;
    }
    else if (rain1h > 0.5) {
      score -= 10;
    }
scoreDiv.innerHTML = `<h2>Safety Score: ${score}</h2>`;

  }