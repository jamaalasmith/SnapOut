import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  // Fetching data from the API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/weatherforecast");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    Hello World
    </>
  );
}

export default App;
