import React from "react";
import "./ConditionsPage.css";

const ConditionsPage = () => {
  return (
    <div className="conditions-page">
      {/* Hero Section */}
      <section className="conditions-hero">
        <h1>Current Weather Conditions</h1>
        <p>Get the latest atmospheric and solar data at a glance, updated in real-time.</p>
      </section>

      {/* Real-Time Weather Stats */}
      <section className="conditions-stats">
        <h2>🌦️ Real-Time Data</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>🌡️ Temperature</h3>
            <p>27.8°C (82.0°F)</p>
          </div>
          <div className="stat-card">
            <h3>💧 Humidity</h3>
            <p>63.0%</p>
          </div>
          <div className="stat-card">
            <h3>🌬️ Wind Speed</h3>
            <p>1.7 m/s (3.9 mph)</p>
          </div>
          <div className="stat-card">
            <h3>📈 Solar Irradiance</h3>
            <p>839.4 W/m²</p>
          </div>
          <div className="stat-card">
            <h3>📉 Air Pressure</h3>
            <p>1013 hPa</p>
          </div>
        </div>
      </section>

      {/* Enhanced Weather Visualizations */}
      <section className="visual-section">
        <h2>🌍 Atmospheric Visualizations</h2>
        <p>Analyze trends with intuitive, data-driven visualizations.</p>
        <div className="visual-container">
          <img src="/example-visualization.png" alt="Visualization Placeholder" />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="conditions-footer">
        <p>Delivering precision data for informed decisions and impactful research.</p>
      </footer>
    </div>
  );
};

export default ConditionsPage;
