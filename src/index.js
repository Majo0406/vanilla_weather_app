function searchCity (city) {
    let apiKey = "638dfae104o02t4843b3b3d0b32d7760";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(weatherResponse);

}

function weatherResponse(response){
    let temperatureElement = document.querySelector("#current-tempeture");
    let tempeture = Math.round(response.data.temperature.current);
    let mintempElement = document.querySelector(".mintemp");
    let maxtempElement = document.querySelector(".maxtemp");
    let mintemp = Math.round(response.data.temperature.minimum);
    let maxtemp = Math.round(response.data.temperature.maximum);
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#current-description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#current-day");
    let date = new Date(response.data.time * 1000);
    let logoElement = document.querySelector("#current-tempeture-logo");

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = tempeture;
    mintempElement.innerHTML = mintemp;
    maxtemp.innerHTML = maxtemp;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
    logoElement.innerHTML = `<img src="${response.data.condition.icon_url}" id="current-tempeture-logo" />`;

}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let today = date.getDate();
    let days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];

    if (minutes<10){
        minutes=`0${minutes}`;
    }

    if(hours<10){
        hours =`0${hours}`;
    }

    return `${day}, ${today} ${month} ${hours}:${minutes}`;
}

function searchForm (event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
}

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", searchForm);

searchCity("Oporto");