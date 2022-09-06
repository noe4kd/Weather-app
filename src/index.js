let now = new Date();

let date = now.getDate();
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="col-4">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
          <div class="card">
            <div class="card-body">
              <h4 class="day-week" id="today">${formatDay(forecastDay.dt)}</h4>
              <div class="indicator_weather_symbol d-sm-block d-none">
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="clear" class="weather-bottom" id="icon-bottom" />
              </div>
              <div class="temperature" id="currentTemperature">
                <spann class="minimumTemp" id="minimumTemperature">${Math.round(
                  forecastDay.temp.min
                )}° |</spann>
                <spann class="maximumTemp" id="maximumTemperature">${Math.round(
                  forecastDay.temp.max
                )}°</spann>
              </div>
              <div class="indicator_weather_bottom">
                <i class="fa-solid fa-droplet bottom-left"></i>
                <spann class="bottom-text-left" id="p1">${Math.round(
                  forecastDay.humidity
                )}%</spann>
                </spann>
                <i class="fa-solid fa-wind bottom-right"></i>
                <spann class="bottom-text-right" id="p2">${Math.round(
                  forecastDay.wind_speed
                )}m/s</spann>
                </spann>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `357f496043907e473ed70c8c25ecf66b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let currentTemperature = document.querySelector("#current-temp");
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  let currentThermalSensation = document.querySelector(
    "#currentThermalSensation"
  );
  let currentHumidity = document.querySelector("#currentHumidity");
  let currentWind = document.querySelector("#currentWind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  temperatureDescription.innerHTML = `${response.data.weather[0].description}`;
  currentThermalSensation.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°`;
  currentHumidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  currentWind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let city = "Funchal";
let apiKey = `357f496043907e473ed70c8c25ecf66b`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#current-place");

  let cityInput = document.querySelector("#search-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = `357f496043907e473ed70c8c25ecf66b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let citySearch = document.querySelector("#search-city");
citySearch.addEventListener("submit", searchCity);

function showCurrentLocationWeather(response) {
  let displayCity = document.querySelector("#current-place");
  displayCity.innerHTML = `${response.data.name}`;

  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `357f496043907e473ed70c8c25ecf66b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentLocationWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
