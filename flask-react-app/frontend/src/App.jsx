import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopHeader from "./components/TopHeader";
import MainPage from "./components/MainPage";
import LiveConditions from "./components/LiveConditions";

function App() {
  return (
    <Router>
      <div className="App">
        <TopHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/live-conditions" element={<LiveConditions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
