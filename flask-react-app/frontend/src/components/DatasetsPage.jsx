import React, { useState } from "react";
import axios from "axios";
import "./DatasetsPage.css";

const DatasetsPage = () => {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [irradianceMin, setIrradianceMin] = useState('');
  const [irradianceMax, setIrradianceMax] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const params = {};

    // Add filters to the query parameters
    if (date) params.date = date;
    if (hour) params.hour_cst = hour;
    if (irradianceMin) params.ghi_min = irradianceMin;
    if (irradianceMax) params.ghi_max = irradianceMax;

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/data", { params });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

      {/* Data Search Section */}
      <section className="data-selection">
  <h2>🔍 Search Data</h2>
  <div className="custom-data-form">
    <label htmlFor="date">Date:</label>
    <input
      type="date"
      id="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
    <label htmlFor="hour">Hour (CST):</label>
    <input
      type="number"
      id="hour"
      placeholder="Enter hour (0-23)"
      value={hour}
      onChange={(e) => setHour(e.target.value)}
    />
    <label htmlFor="irradianceMin">Min Global Horizontal Irradiance (W/m²):</label>
    <input
      type="number"
      id="irradianceMin"
      placeholder="Minimum irradiance"
      value={irradianceMin}
      onChange={(e) => setIrradianceMin(e.target.value)}
    />
    <label htmlFor="irradianceMax">Max Global Horizontal Irradiance (W/m²):</label>
    <input
      type="number"
      id="irradianceMax"
      placeholder="Maximum irradiance"
      value={irradianceMax}
      onChange={(e) => setIrradianceMax(e.target.value)}
    />
    <button
      onClick={handleSearch}
      className="generate-button"
    >
      Search
    </button>
  </div>
</section>


      {/* Results Section */}
      <section className="data-selection">
        <h2>📋 Search Results</h2>
        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Hour (CST)</th>
                  <th className="border px-2 py-1">Global Horizontal Irradiance (W/m²)</th>
                  <th className="border px-2 py-1">Direct Normal Irradiance (W/m²)</th>
                  <th className="border px-2 py-1">Diffuse Horizontal Irradiance (W/m²)</th>
                  <th className="border px-2 py-1">Air Temperature (°C)</th>
                  <th className="border px-2 py-1">Relative Humidity (%)</th>
                  <th className="border px-2 py-1">Pressure (mBar)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.id}>
                    <td className="border px-2 py-1">{row.date}</td>
                    <td className="border px-2 py-1">{row.hour_cst}</td>
                    <td className="border px-2 py-1">{row.avg_global_horizontal}</td>
                    <td className="border px-2 py-1">{row.avg_direct_normal}</td>
                    <td className="border px-2 py-1">{row.avg_diffuse_horizontal}</td>
                    <td className="border px-2 py-1">{row.avg_air_temperature}</td>
                    <td className="border px-2 py-1">{row.avg_relative_humidity}</td>
                    <td className="border px-2 py-1">{row.avg_pressure_mbar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No results found. Try adjusting your search criteria.</p>
        )}
      </section>

      {/* Footer Section */}
      <footer className="datasets-footer">
        <p>Precision Data for Solar and Weather Research.</p>
      </footer>
    </div>
  );
};

export default DatasetsPage;