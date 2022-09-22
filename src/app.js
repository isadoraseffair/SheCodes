function addZeroLeft(timeNumber) {
  if (timeNumber < 10) {
    return `0${timeNumber}`;
  }
  return timeNumber;
}

let now = new Date();

let dayHour = document.querySelector("#day-hour");

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

let hours = addZeroLeft(now.getHours());
let minutes = addZeroLeft(now.getMinutes());

dayHour.innerHTML = `${day}, ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#cityFind");

  let cityId = document.querySelector("#current-city");
  cityId.innerHTML = `☀️ ${searchCityInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&appid=a710bd8bd76400c9658ef649d9e81728&&units=metric`;

  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(showWeatherDescription);
}
let form = document.querySelector("#form-city");
form.addEventListener("submit", searchCity);

function showWeather(response) {
  let tempRound = Math.round(response.data.main.temp);
  let cityTempInfo = document.querySelector("h2");
  cityTempInfo.innerHTML = `${tempRound}ºC`;
}

function showWeatherDescription(response) {
  console.log(response.data.weather[0].description);

  let tempDescription = response.data.weather[0].description;
  let cityDescriptionInfo = document.querySelector("#weather-description");
  cityDescriptionInfo.innerHTML = `${tempDescription}`;
}
// BONUS FEATURE
function showCurrentLocTemp(response) {
  let loc = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let currentCityName = document.querySelector("#current-city");
  currentCityName.innerHTML = `☀️ ${loc}`;
  let currentCityTemp = document.querySelector("h2");
  currentCityTemp.innerHTML = `${temp}ºC`;
}
let currentCityButton = document.querySelector("button");
currentCityButton = addEventListener("click", showCurrentLocTemp);
function newLoc(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showCurrentLocTemp);
}
navigator.geolocation.getCurrentPosition(newLoc);

//  let tempCelButton = document.querySelector ("#temp-cel")
//    function toCelcius(event) {
//let h2 = document.querySelector ("h2")
//h2.innerHTML = `25ºC`
//}
//tempCelButton.addEventListener ("click", toCelcius)

//let tempFaButton = document.querySelector ("#temp-fa")
//    function toFa(event) {
//let h2 = document.querySelector ("h2")
//h2.innerHTML = `96ºF`
//
//empFaButton.addEventListener ("click", toFa)
