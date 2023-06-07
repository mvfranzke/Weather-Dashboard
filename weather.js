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