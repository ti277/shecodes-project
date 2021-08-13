// Timestamp

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let timeHours = date.getHours();
  if (timeHours < 10) {
    timeHours = `0${timeHours}`;
  }
  let timeMinutes = date.getMinutes();
  if (timeMinutes < 10) {
    timeMinutes = `0${timeMinutes}`;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}, ${timeHours}:${timeMinutes}`;
}

// City Update

function showTemperature(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `Current Weather in ${response.data.name}`;
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temp}°`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#windspeed").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector("#dateTime").innerHTML = formatDate(
    response.data.dt * 1000
  );

  //document.querySelector(
  // "#dateTime"
  //).innerHTML = `${day}, ${timeHours}:${timeMinutes}`;

  let iconElement = document.getElementById("icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
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

// Units Converter // Bonus
//function converttoFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.getElementById("temperature");
//  temperatureElement.innerHTML = "66°";
//}

//function converttoCelsius(event) {
//  event.preventDefault();
//  let temperatureElement = document.getElementById("temperature");
//  temperatureElement.innerHTML = "20°";
//}

//let fahrenheitLink = document.getElementById("fahrenheit");
//fahrenheitLink.addEventListener("click", converttoFahrenheit);

//let celsiusLink = document.getElementById("celsius");
//celsiusLink.addEventListener("click", converttoCelsius);
