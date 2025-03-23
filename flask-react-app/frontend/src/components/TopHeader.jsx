import React from "react";
import "./TopHeader.css";

const TopHeader = () => {
  return (
    <div className="top-header">
      {/* Left Side: Logo */}
      <div className="logo">
        <img src="/utrgv logo.png" alt="UTRGV Logo" />
      </div>

      {/* Center: University Text */}
      <div className="header-text">
        <h1>The University of Texas Rio Grande Valley</h1>
      </div>

      {/* Right Side: Buttons */}
      <div className="header-buttons">
        <button className="datasets-button">Datasets</button>
        <button className="menu-button">Main Menu (Main Page)</button>
      </div>
    </div>
  );
};

export default TopHeader;