# 🌦️ Weather App

A responsive weather application built with React and Tailwind CSS that allows users to search for locations around the world and view real-time weather information together with a 5-day forecast.

The application integrates the Open-Meteo Weather and Geocoding APIs and includes worldwide location search, multiple location results, loading and error handling, skeleton loading states, responsive layouts, and light/dark mode.

This project was built to strengthen my practical understanding of React state management, API integration, asynchronous JavaScript, conditional rendering, responsive UI development, and handling real-world API data.

---

## ✨ Features

### 🌍 Worldwide Location Search

Users can search for cities and locations around the world.

The application uses the Open-Meteo Geocoding API to convert a location search into geographic coordinates that can then be used to request weather information.

When several locations have the same or similar name, the application displays multiple matching results so the user can select the intended location.

### 🌡️ Real-Time Weather Information

The application displays current weather information including:

- Current temperature
- Weather condition
- Feels-like temperature
- Relative humidity
- Wind speed
- Surface pressure
- Weather condition icon

Weather codes returned by the API are mapped to readable weather conditions such as clear sky, partly cloudy, rain, snow, fog, and thunderstorms.

### 📅 5-Day Weather Forecast

Users can view a 5-day forecast containing:

- Date
- Weather condition
- Weather icon
- Maximum temperature
- Minimum temperature

Forecast data is dynamically generated from the weather API response.

### ☀️🌙 Light and Dark Mode

The application includes a light/dark theme toggle.

The interface, search field, location suggestions, weather cards, text, backgrounds, and other UI elements adapt to the selected theme.

### 📱 Responsive Design

The application uses a mobile-first responsive layout built with Tailwind CSS.

The interface adapts across:

- Mobile phones
- Tablets
- Laptops
- Desktop screens

Search controls, weather information, weather details, and forecast cards reorganize based on available screen width.

### 💀 Skeleton Loading

A custom skeleton loading component is displayed while weather information is being fetched.

This provides visual feedback instead of leaving the interface blank while waiting for an API response.

### ⚠️ Loading and Error Handling

The application handles different request states including:

- Loading
- Successful requests
- Invalid location searches
- Failed API requests
- Empty search results

Helpful feedback is displayed when weather information cannot be retrieved.

### 📍 Multiple Location Results

Instead of automatically assuming the first city returned by the geocoding API is correct, the application can display multiple matching locations.

Each result can include information such as:

- City/location name
- State or administrative region
- Country

The user can then select the correct location before its weather information is displayed.

---

## 🛠️ Technologies Used

- React
- JavaScript (ES6+)
- Vite
- Tailwind CSS v4
- HTML5
- CSS3
- Open-Meteo Forecast API
- Open-Meteo Geocoding API
- Fetch API
- Git
- GitHub

---

## ⚛️ React Concepts Used

This project makes use of several important React concepts:

### `useState`

Used for local UI state such as:

- Search input
- Light/dark mode
- Location search results

### `useReducer`

Weather-related application state is managed with `useReducer`.

The reducer handles actions including:

- `SET_LOADING`
- `SET_WEATHER`
- `SET_ERROR`
- `STOP_LOADING`
- `RESET_WEATHER`

This keeps weather state transitions organized as the application handles API requests and different UI states.

### Controlled Inputs

The location search field is implemented as a controlled React input, keeping its displayed value synchronized with React state.

### Conditional Rendering

Conditional rendering is used to display different interfaces depending on the current application state, including:

- Initial/empty state
- Loading state
- Skeleton UI
- Error messages
- Location suggestions
- Current weather
- Forecast information

---

## 🌐 API Integration

The project uses Open-Meteo services for weather and location data.

### Open-Meteo Geocoding API

Used to search for locations worldwide and retrieve information such as:

- Location name
- Country
- Administrative region
- Latitude
- Longitude

### Open-Meteo Forecast API

The selected location's latitude and longitude are used to request current weather and forecast information.

Current weather data includes:

- Temperature
- Relative humidity
- Wind speed
- Weather code
- Apparent temperature
- Surface pressure

Daily forecast data includes:

- Maximum temperature
- Minimum temperature
- Weather code
- Forecast dates

---

## 🔄 How the Application Works

```text
User enters a location
        ↓
React stores the search input
        ↓
Open-Meteo Geocoding API
        ↓
Matching locations are returned
        ↓
User selects the intended location
        ↓
Latitude and longitude are retrieved
        ↓
Open-Meteo Forecast API
        ↓
Current weather + 5-day forecast are returned
        ↓
Weather reducer updates application state
        ↓
React renders the weather information
```

---

## 🔄 Asynchronous JavaScript

API requests are handled using:

```js
fetch()
async / await
try / catch
```

This allows the application to request remote data while handling loading, successful responses, and errors appropriately.

---

## 🧠 State Management

Weather information is stored in reducer state containing values such as:

```js
{
  city,
  country,
  temperature,
  condition,
  weatherIcon,
  feelsLike,
  humidity,
  windSpeed,
  pressure,
  loading,
  error,
  forecast
}
```

Separating the reducer into its own file keeps weather-related state logic easier to maintain.

---

## 📁 Project Structure

```text
weather_app/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   └── WeatherSkeleton.jsx
│   │
│   ├── reducers/
│   │   └── weatherReducer.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## 💻 Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Black360-ui/weather-app.git
```

Move into the project directory:

```bash
cd weather-app
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local development URL provided by Vite in your browser.

---
## 🚀 Live Demo

The application is deployed with Vercel.

**Live Demo:** [View the Weather App](https://weather-app-sigma-six-68.vercel.app/)

---

## 📌 What I Practiced Building This Project

This project gave me practical experience with:

- Building reusable React interfaces
- Managing component state with `useState`
- Managing more structured application state with `useReducer`
- Working with controlled form inputs
- Fetching data from external APIs
- Using `async/await`
- Handling asynchronous loading and error states
- Creating skeleton loading interfaces
- Working with real-world JSON API responses
- Converting weather codes into user-friendly conditions
- Working with geographic coordinates
- Handling ambiguous worldwide location searches
- Rendering API data dynamically
- Building a 5-day forecast interface
- Implementing light/dark themes
- Creating responsive layouts with Tailwind CSS
- Using Git and GitHub for version control

---

## 👨‍💻 Author

**Abiola Oladimeji Joshua**

Frontend Web Developer

GitHub: [Black360-ui](https://github.com/Black360-ui)

---

## 📄 Project Status

The core application is complete and includes worldwide weather search, current weather information, a 5-day forecast, responsive design, theme switching, skeleton loading, and API error handling.

Deployment will be added after publishing the application to Vercel. 