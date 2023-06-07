let city;
let queryURL = "https://api.openweathermap.org";
let APIKey = "d7c0697d35036ba74a2e4280f0302ecc";
let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let todayContainer = document.getElementById("today");
let forecastContainer = document.getElementById("forecast");
let cityContainer = document.getElementById("history");


function rendercity() {
  cityContainer.textContent = " ";
  for (let i = 0; i < city.length; i++) {
    let btn = document.createElement("button");
    btn.classList.add("history-btn", "btn-history");
    btn.setAttribute("data-search", city[i]);
    btn.textContent = city[i];
    cityContainer.append(btn);
  }
}


function appendToHistory(search) {
  if (city.indexOf(search) !== -1) {
    return;
  }
  city.push(search);
  localStorage.setItem("search-history", JSON.stringify(city));
  rendercity();
}

function initcity() {
  let storedHistory = localStorage.getItem("search-history");
  if (storedHistory) {
    city = JSON.parse(storedHistory);
  }
  rendercity();
}

function renderCurrentWeather(city, weather) {
  let date = dayjs().format("MMM DD YYYY");
  // Store response data from our fetch request in letiables
  let tempF = weather.main.temp;
  let windMph = weather.wind.speed;
  let humidity = weather.main.humidity;
  let iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  let iconDescription = weather.weather[0].description || weather[0].main;

  let card = document.createElement("div");
  let cardBody = document.createElement("div");
  let heading = document.createElement("h2");
  let weatherIcon = document.createElement("img");
  let tempEl = document.createElement("p");
  let windEl = document.createElement("p");
  let humidityEl = document.createElement("p");

  card.append(cardBody);
  heading.textContent = `${city} (${date})`;
  heading.append(weatherIcon);
  tempEl.textContent = `Temperature: ${tempF}°F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  cardBody.append(heading, tempEl, windEl, humidityEl);

  todayContainer.textContent = " ";
  todayContainer.append(card);
}