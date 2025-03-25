import React, { useState, useEffect } from "react";
import "./LiveDisplay.css";

const LiveDisplay = () => {
  const [data, setData] = useState(null); // State to hold live data
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Mock function to simulate fetching data from a script or API
    const fetchData = async () => {
      const response = await fetch("/path-to-your-script-or-api"); // Replace with actual endpoint
      const result = await response.json(); // Parse the data
      setData(result);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    fetchData();

    // Refresh data every 30 minutes
    const interval = setInterval(fetchData, 1800000); // 30 minutes in milliseconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="live-display">
      <h1>Live Weather Data and Graphical Display</h1>
      <p>Last Updated: {lastUpdated}</p>

      {/* Display detailed weather data */}
      <div className="weather-details">
        {data ? (
          <>
            <p><strong>Temperature:</strong> {data.temperature}°C</p>
            <p><strong>Pressure:</strong> {data.pressure} mBar</p>
            <p><strong>Wind Speed:</strong> {data.windSpeed} m/s</p>
            <p><strong>Humidity:</strong> {data.humidity}%</p>
            <p><strong>Irradiance:</strong> {data.irradiance} W/m²</p>
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      {/* Placeholder for the graphical chart */}
      <div className="graph-placeholder">
        <p>Graph will be displayed here</p>
      </div>
    </div>
  );
};

export default LiveDisplay;
