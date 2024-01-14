const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {

    const apiKey = "50ce61e765fdcfe92f7ab82ad4a624d2";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let response = await fetch(apiUrl)
        .then(response => response.json());

    if (response.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    weather_body.style.display = "block";
    location_not_found.style.display = "none";
    temperature.innerHTML = `${Math.round(response.main.temp - 273.15)}°C`;
    humidity.innerHTML = `${response.main.humidity}%`;
    wind_speed.innerHTML = `${response.wind.speed}Km/H`;
    description.innerHTML = `${response.weather[0].description}`;

    switch (response.weather[0].main) {
        case 'Clouds':
            weather_img.src = "./assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "./assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "./assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./assets/snow.png";
            break;
    }
    console.log(response);
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});