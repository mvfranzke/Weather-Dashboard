let APIKey = "d7c0697d35036ba74a2e4280f0302ecc";
let city;
let queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;

  
fetch(queryURL);
