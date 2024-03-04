import React, { useEffect } from "react";
import Search from "../search/Search.jsx";
import { useState } from "react";
import { getWindDirectionLabel, getCurrentDate } from "../../utility.js";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=8ded7486699a25f0b444233851addcd1&units=metric`
      );

      const data = await response.json();

      if (data) {
        setLoading(false);
        setWeatherData(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  function searchSubmit() {
    fetchWeatherData(search);
  }

  const windDegree = weatherData?.wind.deg;

  useEffect(() => {
    fetchWeatherData("Manchester");
  }, []);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        searchSubmit={searchSubmit}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name},<span> {weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{weatherData?.main?.temp} C</div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind.speed} m/s</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="wind-direction">
                  {getWindDirectionLabel(windDegree)}
                </p>
                <p>Wind Direction</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
