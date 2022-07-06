//Date and Time
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let date = now.getDate();
let hour = now.getHours();
let min = now.getMinutes();

let dateTimeDisplay = document.querySelector(".dateTime");
dateTimeDisplay.innerHTML = `${day}, ${month} ${date} ${hour}:${min}`;

//City Name & Temperature Update
function cityUpdate(event) {
  event.preventDefault();
  let newCityName = document.querySelector("#cityName");
  let currentCityName = document.querySelector(".city");
  currentCityName.innerHTML = newCityName.value;
}

function cityWeatherData(event) {
  event.preventDefault();
  let newCityName = document.querySelector("#cityName").value;
  let units = "imperial";
  let apiKey = "c6f246d160dbacfbf41c2c13d3cb1b49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showNewTemperature);
}

function showNewTemperature(weatherData) {
  let newTemp = Math.round(weatherData.data.main.temp);
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${newTemp}`;
}

let newCity = document.querySelector("#city-search");
newCity.addEventListener("submit", cityUpdate);
newCity.addEventListener("submit", cityWeatherData);

//Current City Name & Temperature Update
function currentGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCityWeatherData);
}

function currentCityWeatherData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "c6f246d160dbacfbf41c2c13d3cb1b49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentCityTemp);
}

function showCurrentCityTemp(weatherData) {
  document.querySelector(".city").innerHTML = weatherData.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    weatherData.data.main.temp
  );
}

let refreshCurrentCity = document.querySelector("#refresh-button");
refreshCurrentCity.addEventListener("click", currentGeolocation);

//Fahrenheight Celcius Switch
function switchToCelcius(event) {
  event.preventDefault();
  let currentT = document.querySelector("#currentTemp");
  let temperature = currentT.innerHTML;
  temperature = Number(temperature);
  currentT.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
function switchToFahrenheit(event) {
  event.preventDefault();
  let currentT = document.querySelector("#currentTemp");
  currentT.innerHTML = 90;
}

let fahrenheit = document.querySelector("#fahrenheit");
let celcius = document.querySelector("#celcius");
fahrenheit.addEventListener("click", switchToCelcius);
celcius.addEventListener("click", switchToFahrenheit);
