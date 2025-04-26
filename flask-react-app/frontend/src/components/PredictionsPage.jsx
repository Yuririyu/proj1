import React from "react";
import "./PredictionsPage.css";

const PredictionsPage = () => {
  return (
    <div className="predictions-page">
      {/* Hero Section */}
      <section className="predictions-hero">
        <h1>Future Weather Predictions</h1>
        <p>Forecasts based on meteorological data and AI-powered analysis.</p>
      </section>

      {/* Predictions Section */}
      <section className="predictions">
        <h2>🔮 Upcoming Weather Forecasts</h2>
        <div className="predictions-container">
          <div className="prediction-card">
            <h3>Next 24 Hours</h3>
            <p>Sunny with intermittent clouds, high of 30°C (86°F).</p>
          </div>
          <div className="prediction-card">
            <h3>Next 48 Hours</h3>
            <p>Partly cloudy with possible light rain, high of 28°C (82°F).</p>
          </div>
          <div className="prediction-card">
            <h3>Next Week</h3>
            <p>Stable conditions with highs averaging 29°C (84°F).</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="predictions-footer">
        <p>Empowering informed decision-making with accurate weather forecasts.</p>
      </footer>
    </div>
  );
};

export default PredictionsPage;
