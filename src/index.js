//Initial Load Date and Time
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
let time = "";

if (min < 10) {
  min = "0" + min;
} else {
  min = min;
}

if (hour > 12) {
  hour = hour-12;
  let time = `${hour}:${min}pm`;
  let dateTimeDisplay = document.querySelector(".dateTime");
  dateTimeDisplay.innerHTML = `${day}, ${month} ${date} ${time}`;
} else {
  let time = `${hour}:${min}am`;
  let dateTimeDisplay = document.querySelector(".dateTime");
  dateTimeDisplay.innerHTML = ` ${day}, ${month} ${date} ${time}`;
}

//Search Button Update
function cityUpdate(event) {
  event.preventDefault();
  document.querySelector(".city").innerHTML = document.querySelector("#cityName").value;
  
  now = new Date();
  day = days[now.getDay()];
  lmonth = months[now.getMonth()];

  date = now.getDate();
  hour = now.getHours();
  min = now.getMinutes();

  if (min < 10) {
    min = "0" + min;
  } else {
    min = min;
  }

  if (hour > 12) {
    hour = hour-12;
    let time = `${hour}:${min}pm`;
    let dateTimeDisplay = document.querySelector(".dateTime");
    dateTimeDisplay.innerHTML = `${day}, ${month} ${date} ${time}`;
  } else {
    let time = `${hour}:${min}am`;
    let dateTimeDisplay = document.querySelector(".dateTime");
    dateTimeDisplay.innerHTML = ` ${day}, ${month} ${date} ${time}`;
  }
}

function cityWeatherData(event) {
  event.preventDefault();
  let newCityName = document.querySelector("#cityName").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showNewWeatherConditions);
}

function showNewWeatherConditions(weatherData) {
  document.querySelector("#currentTemp").innerHTML = Math.round(weatherData.data.main.temp);
  fahrenheitTemp = weatherData.data.main.temp;
  document.querySelector("#currentWind").innerHTML = Math.round(weatherData.data.wind.speed);
  document.querySelector("#currentHumidity").innerHTML = weatherData.data.main.humidity;
  document.querySelector("#weatherIcon").setAttribute("src", `https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}.png`);
  document.querySelector("#weatherIcon").setAttribute("alt", weatherData.data.weather[0].description);
  document.querySelector(".weatherDesc").innerHTML = weatherData.data.weather[0].description;
  if (weatherData.data.weather[0].main === "Rain") {
    document.querySelector("#suggestion").innerHTML = "Suggestion: Don't forget your umbrella today!";
  } else {
    document.querySelector("#suggestion").innerHTML = "Suggestion: Enjoy the day!";
  } 
  getForecast(weatherData.data.coord);
}

let newCity = document.querySelector("#city-search");
newCity.addEventListener("submit", cityUpdate);
newCity.addEventListener("submit", cityWeatherData);




//Refresh Current City Update
function currentGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCityWeatherData);
}

function currentCityWeatherData(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentCityWeather);
}

function showCurrentCityWeather(weatherData) {
  document.querySelector(".city").innerHTML = weatherData.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(weatherData.data.main.temp);
  fahrenheitTemp = weatherData.data.main.temp;
  document.querySelector("#currentWind").innerHTML = Math.round(weatherData.data.wind.speed);
  document.querySelector("#currentHumidity").innerHTML = weatherData.data.main.humidity;
  document.querySelector("#weatherIcon").setAttribute("src", `https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}.png`);
  document.querySelector("#weatherIcon").setAttribute("alt", weatherData.data.weather[0].description);
  document.querySelector(".weatherDesc").innerHTML = weatherData.data.weather[0].description;
  if (weatherData.data.weather[0].main === "Rain") {
    document.querySelector("#suggestion").innerHTML = "Suggestion: Don't forget your umbrella today!";
  } else {
    document.querySelector("#suggestion").innerHTML = "Suggestion: Enjoy the day!";
  }

  getForecast(weatherData.data.coord);

  now = new Date();
  day = days[now.getDay()];
  month = months[now.getMonth()];

  date = now.getDate();
  hour = now.getHours();
  min = now.getMinutes();

  if (min < 10) {
    min = "0" + min;
  } else {
    min = min;
  }

  if (hour > 12) {
    hour = hour-12;
    let time = `${hour}:${min}pm`;
    let dateTimeDisplay = document.querySelector(".dateTime");
    dateTimeDisplay.innerHTML = `${day}, ${month} ${date} ${time}`;
  } else {
    let time = `${hour}:${min}am`;
    let dateTimeDisplay = document.querySelector(".dateTime");
    dateTimeDisplay.innerHTML = ` ${day}, ${month} ${date} ${time}`;
  } 

}

let refreshCurrentCity = document.querySelector("#refresh-button");
refreshCurrentCity.addEventListener("click", currentGeolocation);




//Fahrenheight Celcius Switch
function switchToCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML =  Math.round((( fahrenheitTemp - 32) * 5) / 9);
}

function switchToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
let celcius = document.querySelector("#celcius");
let fahrenheitTemp = null;
fahrenheit.addEventListener("click", switchToFahrenheit);
celcius.addEventListener("click", switchToCelcius);


//Forecast
function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function forecastDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return shortenedDays[day];
}

function displayForecast(response) {
  let forecastInfo = response.data.daily;
  let forecast = document.querySelector("#forecast");
  
  let forecastHTML = `<br /><p class="subheading">This Week</p><div class="row">`;

  forecastInfo.forEach(function(dailyForecast, index) {
    if (index < 6) {
    forecastHTML =  forecastHTML + `
        <div class="col-2">
          <div class = "forecastDate">${forecastDay(dailyForecast.dt)}</div>
          <img src = "https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png" alt="" width="42"/>
          <div class="forecastTemp">
            <span class="forecastTempMax"> ${Math.round(dailyForecast.temp.max)}°F </span>
            <span class="forecastTempMin"> ${Math.round(dailyForecast.temp.min)}°F </span>
          </div>
        </div>
      `;
    }
  })

     forecastHTML = forecastHTML + `</div>`
     forecast.innerHTML = forecastHTML;
}


//Global Variables
let apiKey = "c6f246d160dbacfbf41c2c13d3cb1b49";
let units = "imperial";
let shortenedDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];