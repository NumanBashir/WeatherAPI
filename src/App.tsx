import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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
  }>;
  wind: {
    speed: number;
  };
};

function App() {
  const [city, setCity] = useState<string>("Dubai");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const roundedTemp: number = Math.round(weatherData?.main.temp ?? 0); // If you try to use data from your API call directly without checking if it's there, your code can get "upset"

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
      <div>
        <h2>{weatherData?.name}</h2>
        <p>Temperature: {roundedTemp} °C</p>
        <p>Description: {weatherData?.weather[0].description}</p>
        <p>Feels like: {weatherData?.main.feels_like}°C</p>
        <p>Humidity: {weatherData?.main.humidity}%</p>
        <p>Pressure: {weatherData?.main.pressure}</p>
        <p>Wind Speed: {weatherData?.wind.speed}m/s</p>
      </div>
    </>
  );
}

export default App;
