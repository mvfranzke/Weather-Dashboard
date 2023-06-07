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

    // `data-search` allows access to city name when click handler is invoked
    btn.setAttribute("data-search", city[i]);
    btn.textContent = city[i];
    cityContainer.append(btn);
  }
}
