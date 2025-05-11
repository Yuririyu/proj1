import React, { useState } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DownloadPage.css";

const DownloadPage = () => {
  const [dateRange, setDateRange] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [selectedFormat, setSelectedFormat] = useState("csv"); // Default format

  const handleDateChange = (ranges) => setDateRange([ranges.selection]);

  const downloadFile = async () => {
    const params = {
      start_date: dateRange[0].startDate.toISOString().split("T")[0],
      end_date: dateRange[0].endDate.toISOString().split("T")[0],
      format: selectedFormat
    };

    try {
      const response = await axios.get("http://127.0.0.1:5000/api/download_file", {
        params,
        responseType: "blob"
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
        <p>Select your preferred date range and file format for exporting.</p>
      </section>

      {/* Download Options */}
      <section className="download-options">
        <h2>🎯 Customize Your Download</h2>

        {/* Date Range Picker */}
        <h3>Select Date Range:</h3>
        <DateRange ranges={dateRange} onChange={handleDateChange} showSelectionPreview />

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
