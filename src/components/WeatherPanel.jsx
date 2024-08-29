import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";

const WeatherPanel = () => {
  // Define la clave de API y las URLs base
  const apiKey = "dea8324c6ff806b5b0a1d7b04e963cff";
  const baseUrlWeather = "https://api.openweathermap.org/data/2.5/weather";
  const baseUrlForecast = "https://api.openweathermap.org/data/2.5/forecast";

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const getLocation = async (loc) => {
    setLoading(true);

    // Construye la URL completa para la solicitud de clima
    const urlWeather = `${baseUrlWeather}?appid=${apiKey}&q=${loc}&lang=es`;
    // Construye la URL completa para la solicitud de pronóstico
    const urlForecast = `${baseUrlForecast}?appid=${apiKey}&q=${loc}&lang=es`;

    try {
      // Fetch para el clima
      const weatherResponse = await fetch(urlWeather);
      if (!weatherResponse.ok)
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      setWeather(weatherData);

      // Fetch para el pronóstico
      const forecastResponse = await fetch(urlForecast);
      if (!forecastResponse.ok)
        throw new Error(`Forecast API error: ${forecastResponse.status}`);
      const forecastData = await forecastResponse.json();
      console.log(forecastData);
      setForecast(forecastData);

      setShow(true);
    } catch (error) {
      console.error(error);
      setShow(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Form newLocation={getLocation} />

      <Card
        showData={show}
        loadingData={loading}
        forecast={forecast}
        weather={weather}
      />
    </React.Fragment>
  );
};

export default WeatherPanel;
