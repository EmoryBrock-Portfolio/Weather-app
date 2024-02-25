import React, { useEffect } from "react";
import Search from "../search/Search";
import { useState } from "react";

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

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }


  const windDegree = weatherData?.wind.deg
  
  function windDirectionName(windDegree){

    let label;
  
    switch (true) {
      case windDegree > 315:
        label = "NNW";
        break;
      case windDegree === 315:
        label = "NW";
        break;
      case windDegree > 270:
        label = "WNW";
        break;
      case windDegree === 270:
        label = "W";
        break;
      case windDegree > 225:
        label = "WSW";
        break;
      case windDegree === 225:
        label = "SW";
        break;
      case windDegree > 180:
        label = "SSW";
        break;
      case windDegree === 180:
        label = "S";
        break;
      case windDegree > 135:
        label = "SSE";
        break;
      case windDegree === 135:
        label = "SE";
        break;
      case windDegree > 90:
        label = "ESE";
        break;
      case windDegree === 90:
        label = "E";
        break;
      case windDegree > 45:
        label = "ENE";
        break;
      case windDegree === 45:
        label = "NE";
        break;
      case windDegree > 0:
        label = "NNE";
        break;
      default:
        label = "N";
    }

    return label
  }

  useEffect(() => {
    fetchWeatherData("Manchester");
    document.title = "Weather App v1.1.0"
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
                <p className="wind-direction">{windDirectionName(windDegree)}</p>
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
