let now = new Date();

let date = now.getDate();
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

let firstDay = document.querySelector("#today");
let secondDay = document.querySelector("#tomorrow");
let thirdDay = document.querySelector("#day-after");
let fourthDay = document.querySelector("#day-after-after");

firstDay.innerHTML = `${day} ${date}.${month}`;
secondDay.innerHTML = `day date.${month}`;
thirdDay.innerHTML = `day date.${month}`;
fourthDay.innerHTML = `day date.${month}`;

//

function showTemperature(response) {
  let currentTemperature = document.querySelector("#current-temp");
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  temperatureDescription.innerHTML = `${response.data.weather[0].description}`;

  let currentThermalSensation = document.querySelector(
    "#currentThermalSensation"
  );
  currentThermalSensation.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°`;

  let currentHumidity = document.querySelector("#currentHumidity");
  currentHumidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let currentWind = document.querySelector("#currentWind");
  currentWind.innerHTML = `${response.data.wind.speed} m/s`;

  let currentMinTemperature = document.querySelector("#minimumTemperature");
  currentMinTemperature.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}° |`;

  let currentMaxTemperature = document.querySelector("#maximumTemperature");
  currentMaxTemperature.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;

  let currentHumidityBottom = document.querySelector("#p1");
  currentHumidityBottom.innerHTML = `${Math.round(
    response.data.main.humidity
  )} %`;

  let currentWindBottom = document.querySelector("#p2");
  currentWindBottom.innerHTML = `${response.data.wind.speed} m/s`;
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
  let currentLocationCity = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);

  let displayCity = document.querySelector("#current-place");
  displayCity.innerHTML = `${currentLocationCity}`;

  let displayTemp = document.querySelector("#current-temp");
  displayTemp.innerHTML = `${currentTemp}`;
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
