import React, { useState } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DownloadPage.css";

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

const DownloadPage = () => {
  const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
  const [selectedHours, setSelectedHours] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("csv");

  const handleDateChange = (ranges) => setDateRange([ranges.selection]);

  const downloadFile = async () => {
    const params = {
      start_date: dateRange[0].startDate.toISOString().split("T")[0],
      end_date: dateRange[0].endDate.toISOString().split("T")[0],
      format: selectedFormat,
    };

    if (selectedHours.length > 0) {
      params.hours = selectedHours.join(",");
    }

    if (selectedMetric) {
      params.metric = selectedMetric;
    }

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/download_file", {
        params,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Dataset_${params.start_date}_to_${params.end_date}.${selectedFormat}`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div className="download-page">
      {/* Hero Section */}
      <section className="download-hero">
        <h1>📥 Download Historical Data</h1>
        <p>Select your preferred date range, hours, metric, and format.</p>
      </section>

      {/* Download Options */}
      <section className="download-options">
        <h2>🎯 Customize Your Download</h2>

        {/* Date Range Picker */}
        <h3>Select Date Range:</h3>
        <DateRange ranges={dateRange} onChange={handleDateChange} showSelectionPreview />

        {/* Hour Selection (Grid-style buttons) */}
        <h3>Select Hours (Optional, CST):</h3>
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
        <h3>Choose Metric (Optional):</h3>
        <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
          <option value="">All Metrics</option>
          {Object.keys(metricNames).map((metric, i) => (
            <option key={i} value={metric}>{metricNames[metric]}</option>
          ))}
        </select>

        {/* Format Selection */}
        <h3>Choose File Format:</h3>
        <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
          <option value="xlsx">Excel (.xlsx)</option>
        </select>

        {/* Download Button */}
        <button onClick={downloadFile} className="download-button">Download Dataset</button>
      </section>
    </div>
  );
};

export default DownloadPage;
