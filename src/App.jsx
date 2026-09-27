import { useReducer, useState } from "react";

import { weatherReducer, initialWeatherState } from "./reducers/weatherReducer";

import WeatherSkeleton from "./components/WeatherSkeleton";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [weatherData, dispatch] = useReducer(
    weatherReducer,
    initialWeatherState,
  );
  

  const getWeatherCondition = (code) => {
    if (code === 0) return { icon: "☀️", text: "Clear sky" };
    if (code === 1) return { icon: "🌤️", text: "Mainly clear" };
    if (code === 2) return { icon: "⛅", text: "Partly cloudy" };
    if (code === 3) return { icon: "☁️", text: "Overcast" };
    if (code === 45 || code === 48) return { icon: "🌫️", text: "Foggy" };
    if (code >= 51 && code <= 57) return { icon: "🌦️", text: "Drizzle" };
    if (code >= 61 && code <= 67) return { icon: "🌧️", text: "Rain" };
    if (code >= 71 && code <= 77) return { icon: "❄️", text: "Snow" };
    if (code >= 80 && code <= 82) return { icon: "🌦️", text: "Rain showers" };
    if (code >= 85 && code <= 86) return { icon: "🌨️", text: "Snow showers" };
    if (code >= 95) return { icon: "⛈️", text: "Thunderstorm" };

    return { icon: "🌡️", text: "Unknown" };
  };



  const fetchWeather = async (location) => {
  dispatch({
    type: "SET_LOADING",
  });

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=5`,
    );

    const data = await response.json();

    const condition = getWeatherCondition(data.current.weather_code);

    dispatch({
      type: "SET_WEATHER",
      payload: {
        city: location.name,
        country: location.country,
        temperature: data.current.temperature_2m,
        condition: condition.text,
        weatherIcon: condition.icon,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        pressure: data.current.surface_pressure,
        forecast: data.daily,
      },
    });

    setLocationResults([]);
  } catch (error) {
    dispatch({
      type: "SET_ERROR",
      payload: "Unable to fetch weather data",
    });
  }
};

  const testAPI = async () => {

    if (!searchCity.trim()){
      dispatch({
        type: "SET_ERROR",
        payload: "Please enter a city name",


      });
      return;
    }



    dispatch({
      type: "SET_LOADING",
    });

    try {
      const geoResponse = await fetch(
         `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchCity.trim())}&count=5&language=en&format=json`,
      );

      const geoData = await geoResponse.json();

      

      if(!geoData.results || geoData.results.length === 0){
        dispatch ({
          type: "SET_ERROR",
          payload: "city not found. please try another location.",
        });
        return;

       
      }

     setLocationResults(geoData.results);

      dispatch ({
        type: "STOP_LOADING",
    
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Unable to search for location",
      });
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Header */}
      <header
        className={`border-b ${
          isDarkMode
            ? "border-slate-700 bg-slate-800"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold">Weather App</h1>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-3xl font-bold">Check the weather anywhere</h2>

        <p
          className={`mt-2 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
        >
          Search for a city to see current weather and forecast
        </p>

        {/* Search Form */}
        <form 
        onSubmit={(e)=>{
          e.preventDefault();
          testAPI();

        }}
        className="mt-6 flex max-w-3xl flex-col gap-3 sm:flex-row">
         <input
  type="text"
  placeholder="Enter city name, e.g. Lagos or Toronto Canada"
  value={searchCity}
  onChange={(e) => setSearchCity(e.target.value)}
  className={`flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${
    isDarkMode
      ? "border-slate-400 bg-slate-900 text-white placeholder:text-slate-400"
      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
  }`}
/>

          <button
            type="submit"
            
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
          >
            {weatherData.loading ? "Searching..." : "Search"}
          </button>
        </form>

      {locationResults.length > 0 && (
  <div
    className={`mt-3 max-w-3xl overflow-hidden rounded-lg shadow-md ${
      isDarkMode ? "bg-slate-800" : "bg-white"
    }`}
  >
    {locationResults.map((location) => (
      <button
        key={location.id}
        type="button"
        onClick={() => fetchWeather(location)}
        className={`block w-full border-b px-4 py-3 text-left ${
          isDarkMode
            ? "border-slate-700 text-white hover:bg-slate-700"
            : "border-slate-200 text-slate-900 hover:bg-slate-100"
        }`}
      >
        {location.name}, {location.admin1 && `${location.admin1}, `}
        {location.country}
      </button>
    ))}
  </div>
)}

        {weatherData.error && (
          <p className="mt-4 rounded-lg bg-red-100 p-4 text-red-700  ">
            {weatherData.error}
          </p>
        )}

        {weatherData.loading ? (
          <WeatherSkeleton isDarkMode={isDarkMode} />
        ) : weatherData.city ? (
          <div
            className={`mt-8 rounded-2xl p-6 shadow-md ${
              isDarkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            {/* Your existing Weather Card contents stay here */}

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Location */}
              <div>
                <p className="text-sm text-slate-500">{weatherData.country}</p>

                <h3 className="text-3xl font-bold">{weatherData.city}</h3>

                <p
                  className={`mt-2 text-lg ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {weatherData.condition}
                </p>
              </div>

              {/* Temperature */}
              <div className="text-left sm:text-right">
                <p className="text-6xl font-bold">
                  <span className="mr-3">{weatherData.weatherIcon}</span>
                  {weatherData.temperature}°C
                </p>

                <p className="mt-2 text-slate-500">
                  Feels like {weatherData.feelsLike}°C
                </p>
              </div>
            </div>

            {/* Weather Details */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Humidity */}
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode ? "bg-slate-700" : "bg-slate-100"
                }`}
              >
                <p className="text-sm text-slate-500">Humidity</p>

                <p className="mt-1 text-xl font-bold">
                  {weatherData.humidity}%
                </p>
              </div>

              {/* Wind */}
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode ? "bg-slate-700" : "bg-slate-100"
                }`}
              >
                <p className="text-sm text-slate-500">Wind</p>

                <p className="mt-1 text-xl font-bold">
                  {weatherData.windSpeed} km/h
                </p>
              </div>

              {/* Pressure */}
              <div
                className={`rounded-xl p-4 ${
                  isDarkMode ? "bg-slate-700" : "bg-slate-100"
                }`}
              >
                <p className="text-sm text-slate-500">Pressure</p>

                <p className="mt-1 text-xl font-bold">
                  {weatherData.pressure} hPa
                </p>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold">5-Day Forecast</h3>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
                {weatherData.forecast.time?.map((date, index) => {
                  const forecastCondition = getWeatherCondition(
                    weatherData.forecast.weather_code[index],
                  );

                  return (
                    <div
                      key={date}
                      className={`rounded-xl p-4 text-center ${
                        isDarkMode ? "bg-slate-700" : "bg-slate-100"
                      }`}
                    >
                      <p className="text-sm font-medium">{date}</p>

                      <p className="mt-3 text-3xl">{forecastCondition.icon}</p>

                      <p className="mt-2 text-sm">{forecastCondition.text}</p>

                      <p className="mt-3 font-bold">
                        {weatherData.forecast.temperature_2m_max[index]}°C
                      </p>

                      <p className="text-sm text-slate-500">
                        Low: {weatherData.forecast.temperature_2m_min[index]}°C
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
                  
        ) : (
          <div
            className={`mt-8 rounded-2xl p-10 text-center shadow-md ${
              isDarkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            <p className="text-5xl">🌍</p>

            <h3 className="mt-4 text-2xl font-bold">
              Search for a city to get started
            </h3>

            <p
              className={`mt-2 ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Current weather and a 5-day forecast will appear here.
            </p>
          </div>
        )}


        
      </main>
    </div>
  );
}

export default App;
