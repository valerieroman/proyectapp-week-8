  //Current date and time //
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
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
  
  function dateTime(now) {
    let date = now.getDate();
    let hour = now.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let year = now.getFullYear();
    let month = months[now.getMonth()];
    let weekday = days[now.getDay()];
  
    return `${weekday}, ${month} ${date}, ${year}. Time: ${hour}:${minutes}`;
  }

  let theDate = document.querySelector("#date");
  let now = new Date();
  theDate.innerHTML = dateTime(now);
  
// Current date and time ^^ //


//Current display Temperature, Forecast API, Humidity, Wind, pressure, feels like, overall weather //
function getForecast(coordinates) {
  let apiKey = "b15c68d0eb463f5b86f355f615a747ce";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function retrieveWeather(response) {
    celsiusTemperature = response.data.main.temp;
    

    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round   
      (celsiusTemperature);
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#pressure").innerHTML = response.data.main.pressure;
    document.querySelector("#feelsLike").innerHTML = Math.round(
      response.data.main.feels_like
    );
    document.querySelector("#overall-weather").innerHTML =
      response.data.weather[0].main;
  
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", 
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    iconElement.setAttribute("alt", 
      response.data.weather[0].description);

    getForecast(response.data.coord);
    
  }

  function searchCity(city) {
    let apiKey = "b15c68d0eb463f5b86f355f615a747ce";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(retrieveWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-city-input").value;
    searchCity(cityInputElement);
  }
  function searchLocation(position) {
    let apiKey = "b15c68d0eb463f5b86f355f615a747ce";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(retrieveWeather);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  
  // Fahrenheit to Celsius functions //
  
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureValue = document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureValue.innerHTML = Math.round(celsiusTemperature);
  }
  
  //Forecast functions //
  function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast-temp");

  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
  forecastHTML = 
    forecastHTML + 
    `<div class="col-2 days">
    <div class="weekdays">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
    alt=""
    width="42"
    />
    <div class="high-low">
      <span class="forecast-max">${
        Math.round(forecastDay.temp.max)}°C </span>
      <span class="forecast-min">${
      Math.round(forecastDay.temp.min)}°C </span>
  </div>
  </div>
  
  `;
    }
});

  forecastHTML= forecastHTML +`</div>`;
  forecastElement.innerHTML = forecastHTML;

}


  //
  
  let celsiusTemperature = null;
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  
  let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", convertToCelsius);

  searchCity("Philadelphia");