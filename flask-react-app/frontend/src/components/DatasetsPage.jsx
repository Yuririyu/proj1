import React, { useState } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Default styles
import "react-date-range/dist/theme/default.css"; // Theme styles
import "./DatasetsPage.css";

const DatasetsPage = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [hour, setHour] = useState("");
  const [irradianceMin, setIrradianceMin] = useState("");
  const [irradianceMax, setIrradianceMax] = useState("");
  const [results, setResults] = useState([]);

  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSearch = async () => {
    const params = {
      start_date: dateRange[0].startDate.toISOString().split("T")[0],
      end_date: dateRange[0].endDate.toISOString().split("T")[0],
    };

    if (hour) params.hour_cst = hour;
    if (irradianceMin) params.ghi_min = irradianceMin;
    if (irradianceMax) params.ghi_max = irradianceMax;

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/data", { params });
      setResults(response.data);
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
            <button className="download-button">Select Data</button>
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
          <DateRange
            ranges={dateRange}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            showSelectionPreview={true}
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

          <button onClick={handleSearch} className="generate-button">
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
                  <th className="border px-2 py-1">Global Horizontal (W/m²)</th>
                  <th className="border px-2 py-1">Direct Normal (W/m²)</th>
                  <th className="border px-2 py-1">Diffuse Horizontal (W/m²)</th>
                  <th className="border px-2 py-1">Downwelling IR (W/m²)</th>
                  <th className="border px-2 py-1">Pyrgeometer Net (W/m²)</th>
                  <th className="border px-2 py-1">Global Stdev (W/m²)</th>
                  <th className="border px-2 py-1">Direct Stdev (W/m²)</th>
                  <th className="border px-2 py-1">Diffuse Stdev (W/m²)</th>
                  <th className="border px-2 py-1">IR Stdev (W/m²)</th>
                  <th className="border px-2 py-1">Net Stdev (W/m²)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => {
                  const prevRow = index > 0 ? results[index - 1] : null;
                  const isNewDate = prevRow && row.date !== prevRow.date;

                  return (
                    <React.Fragment key={row.id}>
                      {isNewDate && (
                        <tr className="date-divider">
                          <td colSpan="12" className="date-heading">📅 {row.date}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="border px-2 py-1">{row.date}</td>
                        <td className="border px-2 py-1">{row.hour_cst}</td>
                        <td className="border px-2 py-1">{row.avg_global_horizontal}</td>
                        <td className="border px-2 py-1">{row.avg_direct_normal}</td>
                        <td className="border px-2 py-1">{row.avg_diffuse_horizontal}</td>
                        <td className="border px-2 py-1">{row.avg_downwelling_ir}</td>
                        <td className="border px-2 py-1">{row.avg_pyrgeometer_net}</td>
                        <td className="border px-2 py-1">{row.avg_global_stdev}</td>
                        <td className="border px-2 py-1">{row.avg_direct_stdev}</td>
                        <td className="border px-2 py-1">{row.avg_diffuse_stdev}</td>
                        <td className="border px-2 py-1">{row.avg_ir_stdev}</td>
                        <td className="border px-2 py-1">{row.avg_net_stdev}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No results found. Try adjusting your search criteria.</p>
        )}
      </section>
    </div>
  );
};

export default DatasetsPage;
