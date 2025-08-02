import { useEffect, useState } from "react";
import "./App.css";
import AppLayout from "./AppLayout.jsx";

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
      <AppLayout />
    </>
  );
}

export default App;
