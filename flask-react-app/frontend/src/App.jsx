import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import DatasetsPage from "./components/DatasetsPage";
import ConditionsPage from "./components/ConditionsPage";
import PredictionsPage from "./components/PredictionsPage"; // Keep Predictions if required
import TopHeader from "./components/TopHeader";

const App = () => {
  return (
    <Router>
      <div>
        <TopHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/datasets" element={<DatasetsPage />} />
          <Route path="/view-conditions" element={<ConditionsPage />} />
          <Route path="/weather-predictions" element={<PredictionsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
