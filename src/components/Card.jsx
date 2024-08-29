import React from "react";
import Spinner from "./Spinner";

const Card = ({ loadingData, showData, weather, forecast }) => {
  // Mostrar el Spinner si los datos están cargando
  if (loadingData) {
    return <Spinner />;
  }

  // Mostrar un mensaje si no hay datos disponibles
  if (!showData || !weather || !forecast) {
    return <h2 className="text-center text-white">Sin datos</h2>;
  }

  // Formato de la fecha actual
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = `${day}/${month}/${year}`;

  // URL base para iconos del clima
  const url = "http://openweathermap.org/img/w/";
  const weatherIcon = weather.weather?.[0]?.icon
    ? `${url}${weather.weather[0].icon}.png`
    : "";
  const forecastIcons = forecast.list
    ?.slice(1, 4)
    .map((item) =>
      item?.weather?.[0]?.icon ? `${url}${item.weather[0].icon}.png` : ""
    );

  // Función para formatear fechas de pronóstico
  const formatForecastDate = (dateStr) => {
    return (
      dateStr?.substring(8, 10) +
      "/" +
      dateStr?.substring(5, 7) +
      "/" +
      dateStr?.substring(0, 4) +
      " " +
      dateStr?.substring(11, 13)
    );
  };

  const forecastDates = forecast.list
    ?.slice(1, 4)
    .map((item) => formatForecastDate(item?.dt_txt));

  return (
    <div className="container mx-auto mt-8 p-4 max-w-4xl">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col md:flex-row">
        {/* Imagen y título */}
        <div className="relative flex flex-col items-center p-4 w-full md:w-60">
          <img
            src="https://images.pexels.com/photos/10817264/pexels-photo-10817264.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Weather"
            className="w-full h-60 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-70 text-white px-2 py-1 rounded">
            <h3 className="text-lg font-bold">{weather.name}</h3>
            <p className="text-sm">{date}</p>
          </div>
          <div className="absolute bottom-2 left-2 bg-gray-900 bg-opacity-70 text-white px-2 py-1 rounded">
            <h1 className="text-3xl font-bold">
              {(weather.main.temp - 273.15).toFixed(1)}ºC
            </h1>
            <p className="text-sm">
              <img src={weatherIcon} alt="icon" className="inline-block" />
              {weather.weather[0].description}
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <div className="p-4 flex flex-col justify-between">
          <div className="text-lg mb-4">
            <p>
              Temperatura máxima: {(weather.main.temp_max - 273.15).toFixed(1)}
              ºC
            </p>
            <p>
              Temperatura mínima: {(weather.main.temp_min - 273.15).toFixed(1)}
              ºC
            </p>
            <p>
              Sensación térmica: {(weather.main.feels_like - 273.15).toFixed(1)}
              ºC
            </p>
            <p>Humedad: {weather.main.humidity}%</p>
            <p>Velocidad del viento: {weather.wind.speed} m/s</p>
          </div>

          <hr className="border-gray-600 mb-4" />

          <div className="grid grid-cols-3 gap-4">
            {forecastDates &&
              forecastIcons.map((icon, index) => (
                <div key={index} className="text-center">
                  <p className="font-semibold">{forecastDates[index]}h</p>
                  <p className="text-sm">
                    <img src={icon} alt="icon" className="inline-block" />
                    {forecast.list[index + 1]?.weather[0]?.description}
                  </p>
                  <p className="text-lg font-bold">
                    {(
                      (forecast.list[index + 1]?.main.temp || 0) - 273.15
                    ).toFixed(1)}
                    ºC
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
