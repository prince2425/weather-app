import React, { useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import axios from "axios";

const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [cityName, setCityName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("01d");
  const [description, setDescription] = useState("");
  const [feelsLike, setFeelsLike] = useState(null);
  const [error, setError] = useState("");

  // const API_KEY = "YOUR_OPENWEATHER_API_KEY";
const API_KEY = "8189d2c95a4a73a6fa8ffd077aaa908f"; // from openweathermap
  const fetchWeather = async () => {
    if (!search.trim()) return;

    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
      );

      setTemperature(data.main.temp);
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setCityName(data.name);
      setWeatherIcon(data.weather[0].icon);
      setDescription(data.weather[0].description);
      setFeelsLike(data.main.feels_like);
    } catch (err) {
      setError("City not found!");
      setCityName("");
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setFeelsLike(null);
      setDescription("");
      setWeatherIcon("01d");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-slate-900 to-black p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 text-white">
        
        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-lg">
          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
            className="flex-1 text-black outline-none bg-transparent"
          />

          <FaSearch
            onClick={fetchWeather}
            className="text-gray-700 cursor-pointer text-xl hover:scale-110 transition"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center mt-10">
            <div className="h-10 w-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Weather Icon */}
            <div className="flex justify-center mt-6">
              <img
                src={`https://openweathermap.org/img/wn/${weatherIcon}@4x.png`}
                alt="weather"
                className="w-32 h-32"
              />
            </div>

            {/* Temperature */}
            <div className="text-center">
              <h1 className="text-5xl font-bold">
                {temperature !== null
                  ? `${Math.round(temperature)}°C`
                  : "--"}
              </h1>

              <h2 className="text-2xl font-semibold mt-2">
                {cityName || "Search a city"}
              </h2>

              <p className="capitalize text-gray-300 mt-1">
                {description}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Feels Like:{" "}
                {feelsLike !== null
                  ? `${Math.round(feelsLike)}°C`
                  : "--"}
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-center mt-4">
                {error}
              </p>
            )}

            {/* Weather Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center">
                <WiHumidity className="text-5xl" />
                <p className="text-xl font-semibold mt-2">
                  {humidity !== null ? `${humidity}%` : "--"}
                </p>
                <span className="text-sm text-gray-300">
                  Humidity
                </span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 flex flex-col items-center">
                <FaWind className="text-4xl" />
                <p className="text-xl font-semibold mt-3">
                  {windSpeed !== null ? `${windSpeed} m/s` : "--"}
                </p>
                <span className="text-sm text-gray-300">
                  Wind Speed
                </span>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Weather App • React + Tailwind CSS + OpenWeather API
        </p>
      </div>
    </div>
  );
};

export default App;