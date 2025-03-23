import React from "react";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <header className="main-header">
        <h1>University of Texas Rio Grande Valley</h1>
        <h2>Solar Radiation Lab</h2>
      </header>

      <section className="location-details">
        <h3>Location</h3>
        <ul>
          <li><strong>Latitude:</strong> 26.3059° North</li>
          <li><strong>Longitude:</strong> 98.1716° West</li>
          <li><strong>Elevation:</strong> 45.4 AMSL</li>
          <li><strong>Time Zone:</strong> CST</li>
        </ul>
      </section>

      <section className="data-sets">
        <h3>Available Data Sets</h3>
        <ul>
          <li>"Live" graphical display, updated every 30 minutes</li>
          <li>"Live" data and plots, updated every 30 minutes</li>
          <li>Daily plots and raw data files (September 01, 2011 - Yesterday)</li>
          <li>Solar Calendars (September 2011 - Present Month)</li>
          <li>Wind roses (Monthly, Seasonal, & Yearly)</li>
          <li>Instrument history and metadata</li>
        </ul>
      </section>

      <footer className="footer">
        <p>For more information, explore the full dataset or contact us directly.</p>
      </footer>
    </div>
  );
};

export default MainPage;
