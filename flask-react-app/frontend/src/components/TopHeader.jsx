import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./TopHeader.css";

const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="header-logo">
        <img src="/utrgv_logo.png" alt="UTRGV Logo" />
      </div>
      <div className="header-text">
        <h1>The University Of Texas Rio Grande Valley</h1>
      </div>
      <div className="header-buttons">
        {/* Link for Home */}
        <Link to="/">
          <button>Home</button>
        </Link>
        <button>Data Sets</button>
      </div>
    </header>
  );
};

export default TopHeader;
