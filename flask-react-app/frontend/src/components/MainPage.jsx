import React from "react";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      

      {/* White Professional Hero Section */}
      <section className="white-hero">
  <h1>University of Texas Rio Grande Valley Solar Radiation Lab</h1>
  <p>Advancing solar radiation and meteorological research with precision.</p>
  <div className="hero-info">
    <p><strong>Latitude:</strong> 26.3059° North</p>
    <p><strong>Longitude:</strong> 98.1716° West</p>
    <p><strong>Elevation:</strong> 45.4 AMSL</p>
    <p><strong>Time Zone:</strong> CST</p>
  </div>
</section>


      {/* Video Banner Section */}
      <section className="video-banner">
        <div className="overlay">
          <h2>Explore the Sky</h2>
          <p>Witness the dynamic beauty of the sky while exploring our research initiatives.</p>
        </div>
        <video autoPlay muted loop playsInline className="background-video">
          <source src="/sky-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h2>📊 Live Graphs</h2>
          <p>Explore real-time solar radiation data updated every 30 minutes.</p>
          <button className="feature-button">View Graphs</button>
        </div>
        <div className="feature-card">
          <h2>📂 Downloadable Datasets</h2>
          <p>Access and download historical solar and weather datasets with ease.</p>
          <button className="feature-button">Browse Datasets</button>
        </div>
        <div className="feature-card">
          <h2>🌦️ Meteorological Data</h2>
          <p>Stay informed with detailed weather conditions and updates.</p>
          <button className="feature-button">View Conditions</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <p>Empowering research through NREL's reliable data.</p>
      </footer>
    </div>
  );
};

export default MainPage;
