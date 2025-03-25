import React, { useState, useEffect } from "react";
import "./LiveConditions.css";

const LiveConditions = () => {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/path-to-your-api"); // Replace with your API endpoint
      const result = await response.json();
      setData(result);
      setLastUpdated(new Date().toLocaleTimeString());
    };

    fetchData();

    const interval = setInterval(fetchData, 1800000); // Refresh data every 30 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-conditions">
      <h1>Live Irradiance and Meteorological Conditions</h1>
      <p>Last Updated: {lastUpdated}</p>

      {data ? (
        <div className="conditions-container">
          <div className="irradiance-section">
            <h2>Irradiance ☀️</h2>
            <ul>
              <li><strong>Global Horizontal:</strong> {data.irradiance.globalHorizontal} W/m²</li>
              <li><strong>Direct Normal:</strong> {data.irradiance.directNormal} W/m²</li>
              <li><strong>Diffuse Horizontal:</strong> {data.irradiance.diffuseHorizontal} W/m²</li>
            </ul>
          </div>
          <div className="meteorological-section">
            <h2>Meteorological 🌦️</h2>
            <ul>
              <li><strong>Air Temperature:</strong> {data.meteorological.airTemperature} °C</li>
              <li><strong>Relative Humidity:</strong> {data.meteorological.relativeHumidity} %</li>
              <li><strong>Pressure:</strong> {data.meteorological.pressure} mBar</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default LiveConditions;
