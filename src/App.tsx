import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { FaMagnifyingGlass, FaLocationDot } from "react-icons/fa6";

type WeatherData = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
};

function App() {
  const [city, setCity] = useState<string>("Mexico");
  const [search, setSearch] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const roundedTemp: number = Math.round(weatherData?.main.temp ?? 0); // If you try to use data from your API call directly without checking if it's there, your code can get "upset"

  const iconCode = weatherData?.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  // Trigger button on Enter key press
  var inputTest = document.getElementById("myInput");
  inputTest?.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("myBtn")?.click();
    }
  });

  const fetchData = async () => {
    try {
      if (!city) return;
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=167e45ba44d9662755d1a25effac5f34`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
      alert("Invalid City");
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    setCity(search);
  };

  return (
    <>
      <div className="container">
        <div className="search-box">
          <i className="fa-solid fa-location-dot">
            <FaLocationDot />
          </i>
          <input
            id="myInput"
            type="text"
            placeholder="Enter your location"
            value={search}
            onChange={handleSearchChange}
            autoFocus
          />
          <button id="myBtn" onClick={handleSearchSubmit}>
            <FaMagnifyingGlass />
          </button>
        </div>
        <div className="weather-box">
          <h2 className="weather-location">{weatherData?.name}</h2>
          <p>Temperature: {roundedTemp} °C</p>
          <img className="weather-img" src={iconUrl} />
          <div className="row">
            <div className="column">
              <p>Description: {weatherData?.weather[0].description}</p>
              <p>Feels like: {weatherData?.main.feels_like}°C</p>
            </div>
            <div className="column">
              <p>Humidity: {weatherData?.main.humidity}%</p>
              <p>Wind Speed: {weatherData?.wind.speed}m/s</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// TODO: CSS Styling and components
