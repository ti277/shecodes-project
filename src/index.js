function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
       <div class="forecast-date">${day}</div>
          <img
          src="http://openweathermap.org/img/wn/04d@2x.png"
          alt=""
          width="40"
          />
            <div class="forecast-temperatures">
                  <span class="forecast-temperatures-max">20°</span>
                  <span class="forecast-temperatures-min">10°</span>
            </div>
        
   </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  // displayForecast();
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
  cityElement.innerHTML = `Current weather in ${response.data.name}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `Humidity ${response.data.main.humidity}%`;
  windElement.innerHTML = `Wind speed ${Math.round(
    response.data.wind.speed
  )} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "6d8f196de3773bfca32250912a520ffd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function getLocation(position) {
  let apiKey = "6d8f196de3773bfca32250912a520ffd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let form = document.querySelector("#searchengine");
form.addEventListener("submit", handleSubmit);

let locationButton = document.getElementById("locate");
locationButton.addEventListener("click", searchLocation);

search("Hamburg");
displayForecast();

// Units Converter // Bonus
function converttoFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

function converttoCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let fahrenheitLink = document.getElementById("fahrenheit");
fahrenheitLink.addEventListener("click", converttoFahrenheit);

let celsiusLink = document.getElementById("celsius");
celsiusLink.addEventListener("click", converttoCelsius);

let celsiusTemperature = null;
