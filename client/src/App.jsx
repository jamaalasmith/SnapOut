import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {fetch("/api/weatherforecast")
        .then((response) => response.json())
        .then((data) => (
          <div>
            <h2>Weather Forecast</h2>
            <ul>
              {data.map((forecast) => (
                <li key={forecast.date}>
                  {forecast.date}: {forecast.temperatureC}°C, {forecast.summary}
                </li>
              ))}
            </ul>
          </div>
        ))
        .catch((error) => (
          <div>Error fetching weather data: {error.message}</div>
        ))}
    </>
  );
}

export default App;
