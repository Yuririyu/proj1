import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConditionsPage.css";

const ConditionsPage = () => {
  const [dailyAverage, setDailyAverage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/daily_average");
        setDailyAverage(response.data.data[0]); // Ensure first object is selected
      } catch (err) {
        console.error("Error fetching daily average:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="conditions-page">
      {/* Hero Section */}
      <section className="conditions-hero">
        <h1>Daily Solar Conditions for April 25, 2025</h1>
        <p>Average solar radiation and atmospheric metrics for this specific day.</p>
      </section>

      {/* Data Summary */}
      <section className="conditions-stats">
        <h2>🌤 Daily Averages</h2>
        <div className="dashboard-container">
          {loading ? (
            <p>Loading daily average data...</p>
          ) : error ? (
            <p>Error fetching data: {error}</p>
          ) : dailyAverage ? (
            <>
              <div className="data-card">
                <h3>🌞 Global Horizontal</h3>
                <p><span>{dailyAverage.avg_global_horizontal.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>☀ Direct Normal</h3>
                <p><span>{dailyAverage.avg_direct_normal.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>🌤 Diffuse Horizontal</h3>
                <p><span>{dailyAverage.avg_diffuse_horizontal.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>🔥 Downwelling IR</h3>
                <p><span>{dailyAverage.avg_downwelling_ir.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>⚡ Pyrgeometer Net</h3>
                <p><span>{dailyAverage.avg_pyrgeometer_net.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>📈 Global Stdev</h3>
                <p><span>{dailyAverage.avg_global_stdev.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>📊 Direct Stdev</h3>
                <p><span>{dailyAverage.avg_direct_stdev.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>🌥 Diffuse Stdev</h3>
                <p><span>{dailyAverage.avg_diffuse_stdev.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>🔎 IR Stdev</h3>
                <p><span>{dailyAverage.avg_ir_stdev.toFixed(2)} W/m²</span></p>
              </div>
              <div className="data-card">
                <h3>⚖ Net Stdev</h3>
                <p><span>{dailyAverage.avg_net_stdev.toFixed(2)} W/m²</span></p>
              </div>
            </>
          ) : (
            <div className="data-card no-data">
              <h3>No Valid Data Available</h3>
              <p>Some data may be missing or invalid for April 25, 2025.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="conditions-footer">
        <p>Providing average solar radiation insights for informed decisions.</p>
      </footer>
    </div>
  );
};

export default ConditionsPage;
