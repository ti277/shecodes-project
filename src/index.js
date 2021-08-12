let date = new Date();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[date.getDay()];
let timeHours = date.getHours();
if (timeHours < 10) {
  timeHours = `0${timeHours}`;
}
let timeMinutes = date.getMinutes();
if (timeMinutes < 10) {
  timeMinutes = `0${timeMinutes}`;
}
document.getElementById(
  "dateTime"
).innerHTML = `${day}, ${timeHours}:${timeMinutes}`;

// City

function showTemperature(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `Current Weather in ${response.data.name}`;
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temp}°C`;
}

function displayCity(event) {
  event.preventDefault();
  let apiKey = "6d8f196de3773bfca32250912a520ffd";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

let searchEngine = document.querySelector("#searchengine");
searchEngine.addEventListener("click", displayCity);

function getLocation(position) {
  let apiKey = "6d8f196de3773bfca32250912a520ffd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.getElementById("locate");
locationButton.addEventListener("click", searchLocation);
