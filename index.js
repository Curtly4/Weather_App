const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "76fa29580c91e1bdc0585339af671891";
  let city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity");
      const wind = document.querySelector(".weather-details .wind span");
      const weather = [];

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "images/clear-sky.png";
          break;

        case "Clouds":
          image.src = "images/cloudy.png";
          break;

        case "Fog":
          image.src = "images/foggy.png";
          break;

        case "Rain":
          image.src = "images/rainny.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(data.main.temp)}&deg;F`;
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)}mph`;

      console.log(data);
      console.log(temperature.innerHTML);
      console.log(description.innerHTML);
      console.log(humidity.innerHTML);
      console.log(wind.innerHTML);

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});