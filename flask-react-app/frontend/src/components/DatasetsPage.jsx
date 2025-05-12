import React, { useState } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DatasetsPage.css";

const metricNames = {
  avg_global_horizontal: "Global Horizontal (W/m²)",
  avg_direct_normal: "Direct Normal (W/m²)",
  avg_diffuse_horizontal: "Diffuse Horizontal (W/m²)",
  avg_downwelling_ir: "Downwelling IR (W/m²)",
  avg_pyrgeometer_net: "Pyrgeometer Net (W/m²)",
  avg_global_stdev: "Global Stdev (W/m²)",
  avg_direct_stdev: "Direct Stdev (W/m²)",
  avg_diffuse_stdev: "Diffuse Stdev (W/m²)",
  avg_ir_stdev: "IR Stdev (W/m²)",
  avg_net_stdev: "Net Stdev (W/m²)"
};

const DatasetsPage = () => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 50; // Results per page

  const handleDateChange = (ranges) => setDateRange([ranges.selection]);

  const fetchData = async (newPage = 1) => {
    setPage(newPage); // Update the page state

    const params = {
      start_date: dateRange[0].startDate.toISOString().split("T")[0],
      end_date: dateRange[0].endDate.toISOString().split("T")[0],
      page: newPage,
      limit
    };

    if (selectedHours.length > 0 && !selectedHours.includes("")) {
      params.hours = selectedHours.join(",");
    }

    if (selectedMetric) params.metric = selectedMetric;

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/data", { params });
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
            <button className="download-button" onClick={() => window.location.href="/download"}>Select Data</button>
          </div>
          <div className="option-card">
            <h3>Daily Statistics</h3>
            <p>Access summarized daily trends for comprehensive analysis.</p>
            <button className="download-button">Download</button>
          </div>
          <div className="option-card">
            <h3>Live Data</h3>
            <p>Explore real-time raw data outputs for immediate insights.</p>
            <button
              className="view-data-button"
              onClick={() => window.open("https://midcdmz.nrel.gov/apps/gdisplay.pl?UTPASRL", "_blank")}
            >
              View Live Data
            </button>
          </div>
        </div>
      </section>

      {/* Data Search Section */}
      <section className="data-selection">
        <h2>🔍 Search Data</h2>
        <div className="custom-data-form">
          <h3>Select Date Range:</h3>
          <DateRange ranges={dateRange} onChange={handleDateChange} showSelectionPreview />

          {/* Hour Selection (Grid of Clickable Buttons) */}
          <label>Select Hours (Optional, CST):</label>
          <div className="hour-grid">
            {Array.from({ length: 24 }, (_, i) => (
              <button
                key={i}
                className={`hour-button ${selectedHours.includes(i.toString()) ? "selected" : ""}`}
                onClick={() => {
                  setSelectedHours(prev =>
                    prev.includes(i.toString()) ? prev.filter(h => h !== i.toString()) : [...prev, i.toString()]
                  );
                }}
              >
                {i}:00
              </button>
            ))}
          </div>

          {/* Metric Selection */}
          <label>Filter by Irradiance Metric (Optional):</label>
          <select id="metric" value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
            <option value="">All Metrics</option>
            {Object.keys(metricNames).map((metric, i) => (
              <option key={i} value={metric}>{metricNames[metric]}</option>
            ))}
          </select>

          <button onClick={() => fetchData(1)} className="generate-button">Search</button>
        </div>
      </section>

      {/* Results Section */}
      <section className="data-selection">
        <h2>📋 Results</h2>

        {/* Pagination at the Top */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => fetchData(page - 1)}>⬅ Previous</button>
          {results.length === limit && (
            <button onClick={() => fetchData(page + 1)}>Next ➡</button>
          )}
        </div>

        {results.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 whitespace-nowrap">Date</th>
                    <th className="border px-4 py-2">Hour (CST)</th>
                    {selectedMetric ? (
                      <th className="border px-4 py-2">{metricNames[selectedMetric]}</th>
                    ) : (
                      Object.keys(metricNames).map((metric, i) => (
                        <th key={i} className="border px-4 py-2">{metricNames[metric]}</th>
                      ))
                    )}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 whitespace-nowrap">{row.date}</td>
                      <td className="border px-4 py-2">{row.hour_cst}</td>
                      {selectedMetric ? (
                        <td className="border px-4 py-2">{row[selectedMetric]}</td>
                      ) : (
                        Object.keys(metricNames).map((metric, i) => (
                          <td key={i} className="border px-4 py-2">{row[metric]}</td>
                        ))
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination at the Bottom */}
            <div className="pagination">
              <button disabled={page === 1} onClick={() => fetchData(page - 1)}>⬅ Previous</button>
              {results.length === limit && (
                <button onClick={() => fetchData(page + 1)}>Next ➡</button>
              )}
            </div>
          </>
        ) : (
          <p>No results found. Try adjusting your search criteria.</p>
        )}
      </section>
    </div>
  );
};

export default DatasetsPage;
