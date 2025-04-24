import React, { useState } from "react";
import "./DatasetsPage.css";

const DatasetsPage = () => {
  const [instrument, setInstrument] = useState("");
  const [secondary, setSecondary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Generating data for ${instrument || "Primary Instrument"} and ${
        secondary || "None"
      }!`
    );
  };

  return (
    <div className="datasets-page">
      {/* Hero Section */}
      <section className="datasets-hero">
        <h1>Explore Historical Solar and Weather Data</h1>
        <p>Access and customize datasets tailored for your research needs.</p>
      </section>

      {/* Data Selection Section */}
      <section className="data-selection">
        <h2>📂 Available Data Outputs</h2>
        <div className="output-options">
          <div className="option-card">
            <h3>Hourly Data</h3>
            <p>Download aggregated hourly statistics in accessible formats.</p>
            <button className="download-button">Download</button>
          </div>
          <div className="option-card">
            <h3>Daily Statistics</h3>
            <p>Access summarized daily trends for comprehensive analysis.</p>
            <button className="download-button">Download</button>
          </div>
          <div className="option-card">
            <h3>Live Data</h3>
            <p>Explore real-time raw data outputs for immediate insights.</p>
            <button className="download-button">Download</button>
          </div>
        </div>
      </section>

      {/* Custom Data Section */}
      <section className="custom-data">
        <h2>⚙ Generate Custom Data</h2>
        <p>Select instruments and metrics to create tailored outputs:</p>
        <form className="custom-data-form" onSubmit={handleSubmit}>
          <label htmlFor="instrument">Primary Instrument:</label>
          <select
            id="instrument"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          >
            <optgroup label="Irradiance Parameters">
              <option value="global">Global Horizontal</option>
              <option value="direct">Direct Normal</option>
              <option value="diffuse">Diffuse Horizontal</option>
              <option value="downwelling-ir">Downwelling IR</option>
            </optgroup>
            <optgroup label="Meteorological Parameters">
              <option value="temperature">Air Temperature</option>
              <option value="humidity">Relative Humidity</option>
              <option value="pressure">Pressure</option>
              <option value="wind-speed">Wind Speed</option>
              <option value="wind-direction">Wind Direction</option>
            </optgroup>
          </select>
          <label htmlFor="secondary">Secondary Metric:</label>
          <select
            id="secondary"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          >
            <optgroup label="Irradiance Parameters">
              <option value="global">Global Horizontal</option>
              <option value="direct">Direct Normal</option>
              <option value="diffuse">Diffuse Horizontal</option>
            </optgroup>
            <optgroup label="Meteorological Parameters">
              <option value="wind-speed">Wind Speed</option>
              <option value="pressure">Pressure</option>
              <option value="air-temperature">Air Temperature</option>
            </optgroup>
          </select>
          <button type="submit" className="generate-button">
            Generate Data
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="datasets-footer">
        <p>Precision Data for Solar and Weather Research.</p>
      </footer>
    </div>
  );
};

export default DatasetsPage;