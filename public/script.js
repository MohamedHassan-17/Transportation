console.log("Script loaded successfully.");


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

fetch("seejson.txt")
  .then(res => res.json())
  .then(data => {
    console.log("LOCAL JSON:", data);
    checkWeather(data);
  })
  .catch(err => console.error("Error loading local JSON:", err));


 function checkWeather(data) {
    const weatherDescription = data.weather[0].description;
    console.log("Current weather description:", weatherDescription);
 }