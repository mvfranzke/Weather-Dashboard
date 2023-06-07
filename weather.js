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

function renderForecastCard(forecast) {
  let tempF = forecast.main.temp;
  let humidity = forecast.main.humidity;
  let windMph = forecast.wind.speed;
  let col = document.createElement("div");
  let card = document.createElement("div");
  let cardBody = document.createElement("div");
  let cardTitle = document.createElement("h5");
  let weatherIcon = document.createElement("img");
  let tempEl = document.createElement("p");
  let windEl = document.createElement("p");
  let humidityEl = document.createElement("p");

  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
  col.classList.add("five-day-card");

  cardTitle.textContent = dayjs(forecast.dt_txt).format("MMM DD YYYY");
  tempEl.textContent = `Temperature: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(col);
}


function renderForecast(dailyForecast) {
  let startDt = dayjs().add(1, "day").startOf("day").unix();
  let endDt = dayjs().add(6, "day").startOf("day").unix();
  let headingCol = document.createElement("div");
  let heading = document.createElement("h4");

  heading.textContent = "5-Day Forecast:";
  headingCol.append(heading);

  forecastContainer.innerHTML = "";
  forecastContainer.append(headingCol);

  for (let i = 0; i < dailyForecast.length; i++) {
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
      if (dailyForecast[i].dt_txt.slice(11, 13) == "12") {
        renderForecastCard(dailyForecast[i]);
      }
    }
  }
}

function renderItems(city, data) {
  renderCurrentWeather(city, data.list[0], data.city.timezone);
  renderForecast(data.list);
}

function fetchWeather(location) {
  let { lat } = location;
  let { lon } = location;
  let city = location.name;

  let apiUrl = `${queryURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
  let apiUrl = `${queryURL}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Location not found. Please try again");
      } else {
        appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function handleSearchFormSubmit(e) {
  if (!searchInput.value) {
    return;
  }

  e.preventDefault();
  let search = searchInput.value.trim();
  fetchCoords(search);
  searchInput.value = "";
}
