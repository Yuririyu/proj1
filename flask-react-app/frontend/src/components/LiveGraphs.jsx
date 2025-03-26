import React from "react";
import "./LiveGraphs.css";

const LiveGraphs = () => {
  return (
    <div className="live-graphs-page">
      {/* Hero Section */}
      <section className="live-graphs-hero">
        <h1>Live Solar Radiation and Weather Data</h1>
        <p>Explore real-time insights into meteorological and solar conditions.</p>
      </section>

      {/* Graph Section */}
      <section className="graphs-section">
        <h2>📊 Solar Irradiance Graphs</h2>
        <p>View the latest solar radiation data, updated dynamically.</p>
        <div className="graph-container">
          {/* Graph placeholder or chart component */}
          <img src="/example-graph.png" alt="Graph Placeholder" />
        </div>
      </section>

      {/* Weather Stats Section */}
      <section className="weather-stats">
        <h2>🌦️ Current Weather Conditions</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>🌡️ Temperature</h3>
            <p>27.8°C (82.0°F)</p>
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
            <h3>💧 Humidity</h3>
            <p>63.0%</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="live-graphs-footer">
        <p>Empowering research through accurate and reliable data.</p>
      </footer>
    </div>
  );
};

export default LiveGraphs;
