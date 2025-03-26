import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LiveGraphs from "./components/LiveGraphs";
import DatasetsPage from "./components/DatasetsPage";
import ConditionsPage from "./components/ConditionsPage";
import PredictionsPage from "./components/PredictionsPage"; // Import PredictionsPage
import TopHeader from "./components/TopHeader"; // Import TopHeader

const App = () => {
  return (
    <Router>
      <div>
        <TopHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/live-graphs" element={<LiveGraphs />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/view-conditions" element={<ConditionsPage />} />
          <Route path="/weather-predictions" element={<PredictionsPage />} /> {/* New predictions route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
