import React from "react";
import "./DatasetsPage.css";

const DatasetsPage = () => {
  return (
    <div className="datasets-page">
      {/* Hero Section */}
      <section className="datasets-hero">
        <h1>Download Historical Solar and Weather Data</h1>
        <p>Access detailed datasets and customize data outputs for your research.</p>
      </section>

      {/* Data Selection Section */}
      <section className="data-selection">
        <h2>📂 Available Data Outputs</h2>
        <div className="output-options">
          <div className="option-card">
            <h3>Selected 1-Min Data</h3>
            <p>Get high-resolution minute-by-minute solar and weather data in ASCII format.</p>
            <button className="download-button">Download</button>
          </div>
          <div className="option-card">
            <h3>Hourly Data</h3>
            <p>Download aggregated hourly data with detailed statistics in ASCII format.</p>
            <button className="download-button">Download</button>
          </div>
          <div className="option-card">
            <h3>Daily Statistics</h3>
            <p>Access summarized daily statistics for long-term trend analysis.</p>
            <button className="download-button">Download</button>
          </div>
          <div className="option-card">
            <h3>Live Raw Data</h3>
            <p>View real-time data outputs in raw ASCII format for immediate insights.</p>
            <button className="download-button">Download</button>
          </div>
        </div>
      </section>

      {/* Generate Custom Data Section */}
      <section className="custom-data">
        <h2>⚙️ Generate Custom Data</h2>
        <p>Select instruments or metrics to create tailored outputs:</p>
        <form className="custom-data-form">
          <label htmlFor="instrument">Primary Instrument/Metric:</label>
          <select id="instrument">
            <option value="global">Global Horizontal</option>
            <option value="temperature">Air Temperature</option>
            <option value="humidity">Relative Humidity</option>
          </select>
          <label htmlFor="secondary">Secondary Instrument/Value:</label>
          <select id="secondary">
            <option value="none">None</option>
            <option value="wind">Wind Speed</option>
            <option value="pressure">Pressure</option>
          </select>
          <button type="submit" className="generate-button">Generate Data</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="datasets-footer">
        <p>Empowering solar and weather research with precision data outputs.</p>
      </footer>
    </div>
  );
};

export default DatasetsPage;
