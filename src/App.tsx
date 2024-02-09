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
  const [city, setCity] = useState<string>("Rio");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const roundedTemp: number = Math.round(weatherData?.main.temp ?? 0); // If you try to use data from your API call directly without checking if it's there, your code can get "upset"

  const iconCode = weatherData?.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  const fetchData = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=167e45ba44d9662755d1a25effac5f34`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <>
      <div className="container">
        <div className="search-box">
          <i className="fa-solid fa-location-dot">
            <FaLocationDot />
          </i>
          <input type="text" placeholder="Enter your location" />
          <button className="fa-solid fa-magnifying-glass">
            <FaMagnifyingGlass />
          </button>
        </div>
        <h2>{weatherData?.name}</h2>
        <div>
          <p>Temperature: {roundedTemp} °C</p>
          <p>Description: {weatherData?.weather[0].description}</p>
          <p>Feels like: {weatherData?.main.feels_like}°C</p>
          <p>Humidity: {weatherData?.main.humidity}%</p>
          <p>Wind Speed: {weatherData?.wind.speed}m/s</p>
          <img className="weather-img" src={iconUrl} />
        </div>
      </div>
    </>
  );
}

export default App;

// TODO: Search input field
// TODO: CSS Styling and components
