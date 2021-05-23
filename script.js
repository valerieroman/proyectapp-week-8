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
  
    return `${weekday}, ${year} ${month} ${date}, ${hour}:${minutes}`;
  }

  let theDate = document.querySelector("#date");
  let now = new Date();
  theDate.innerHTML = dateTime(now);
  
// Current date and time ^^ //


//Current Temperature, Humidity, Wind, pressure, feels like, overall weather //
  function retrieveWeather(response) {
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round   
      (response.data.main.temp);
  
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
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  

  // Fahrenheit to Celsius functions //

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);

  function convertToFahrenheit(event) {
    event.preventDefault();
    let fahTemp = (celTemp * 9) / 5 + 32;
    let temperatureValue = document.querySelector("#temperature");
    temperatureValue.innerHTML = Math.round(fahTemp);
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureValue = document.querySelector("#temperature");
    temperatureValue.innerHTML = celTemp;
  }

  searchCity("Philadelphia");