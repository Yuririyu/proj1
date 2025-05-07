import React, { useState, useEffect } from "react";
import "./ConditionsPage.css";
import CleanedSolarData from "./CleanedSolarData";
import SolarGraph from "./SolarGraph";
import Papa from "papaparse";

const ConditionsPage = () => {
  const [solarData, setSolarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const url = `https://midcdmz.nrel.gov/apps/daily.pl?site=UTPASRL&start=20110901&yr=${year}&mo=${month}&dy=${day}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        const result = Papa.parse(text, { header: true });
        const cleaned = result.data.filter(row =>
          Object.values(row).some(val => val && val.trim() !== '')
        );
        setSolarData(cleaned);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching or parsing data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="conditions-page">
      {/* Hero Section */}
      <section className="conditions-hero">
        <h1>Current Weather and Solar Data</h1>
        <p>Comprehensive updates on atmospheric conditions and solar radiation patterns.</p>
      </section>

      {/* Real-Time Weather Stats */}
      <section className="conditions-stats">
        <h2>🌦️ Real-Time Data Summary</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>🌡️ Temperature</h3>
            <p><strong>Current:</strong> 27.8°C (82.0°F)</p>
            <p><strong>High:</strong> 27.8°C at 11:25</p>
            <p><strong>Low:</strong> 20.0°C at 07:13</p>
          </div>
          <div className="stat-card">
            <h3>📉 Air Pressure</h3>
            <p><strong>Current:</strong> 1013.1 mBar</p>
            <p><strong>Sea Level Estimation:</strong> 1018.6 mBar</p>
          </div>
          <div className="stat-card">
            <h3>🌬️ Wind</h3>
            <p><strong>Speed:</strong> 1.7 m/s</p>
            <p><strong>Direction:</strong> 140° (SE)</p>
            <p><strong>Peak Gust:</strong> 7.1 m/s at 00:27</p>
          </div>
          <div className="stat-card">
            <h3>💧 Humidity</h3>
            <p><strong>Current:</strong> 63.0%</p>
            <p><strong>Max:</strong> 98.5% at 07:35</p>
            <p><strong>Min:</strong> 62.6% at 11:26</p>
          </div>
        </div>
      </section>

      {/* Solar Radiation Section */}
      <section className="solar-section">
        <h2>🔆 Solar Radiation</h2>
        <div className="solar-container">
          <div className="solar-card">
            <h3>Global Horizontal</h3>
            <p><strong>Current:</strong> 839.4 W/m²</p>
            <p><strong>Daily Total:</strong> 1.822 kWh/m²</p>
          </div>
          <div className="solar-card">
            <h3>Direct Normal</h3>
            <p><strong>Current:</strong> 334.3 W/m²</p>
            <p><strong>Daily Total:</strong> 0.597 kWh/m²</p>
          </div>
          <div className="solar-card">
            <h3>Diffuse Horizontal</h3>
            <p><strong>Current:</strong> 355.2 W/m²</p>
            <p><strong>Daily Total:</strong> 1.044 kWh/m²</p>
          </div>
          <div className="solar-card">
            <h3>Infrared Radiation</h3>
            <p><strong>Estimated Net:</strong> -80.9 W/m²</p>
            <p><strong>Downwelling:</strong> 416.1 W/m²</p>
          </div>
        </div>
      </section>

      {/* Cleaned Solar Data Table */}
      <section className="solar-table">
        <h2>📄 Cleaned Solar Data</h2>
        <CleanedSolarData data={solarData} loading={loading} />
      </section>

      {/* Graph Visualizations Section */}
      <section className="visual-section">
        <h2>📊 Solar Radiation and Trends</h2>
        <div className="visual-container">
          <SolarGraph data={solarData} loading={loading} />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="conditions-footer">
        <p>Empowering research with precise meteorological and solar radiation data.</p>
      </footer>
    </div>
  );
};

export default ConditionsPage;

