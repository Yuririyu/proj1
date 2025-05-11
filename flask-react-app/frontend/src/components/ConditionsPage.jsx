import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConditionsPage.css";

const ConditionsPage = () => {
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/latest-data");
        setLatestData(response.data);
      } catch (error) {
        console.error("Error fetching latest data:", error);
      }
    };

    fetchLatestData();
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
        {latestData ? (
          <div className="stats-container">
            <div className="stat-card">
              <h3>🌡️ Temperature</h3>
              <p><strong>Global Horizontal:</strong> {latestData.avg_global_horizontal} W/m²</p>
              <p><strong>Direct Normal:</strong> {latestData.avg_direct_normal} W/m²</p>
              <p><strong>Diffuse Horizontal:</strong> {latestData.avg_diffuse_horizontal} W/m²</p>
            </div>
            <div className="stat-card">
              <h3>🔆 Solar Radiation</h3>
              <p><strong>Downwelling IR:</strong> {latestData.avg_downwelling_ir} W/m²</p>
              <p><strong>Pyrgeometer Net:</strong> {latestData.avg_pyrgeometer_net} W/m²</p>
            </div>
          </div>
        ) : (
          <p>Loading latest data...</p>
        )}
      </section>

      {/* Footer Section */}
      <footer className="conditions-footer">
        <p>Empowering research with precise meteorological and solar radiation data.</p>
      </footer>
    </div>
  );
};

export default ConditionsPage;
