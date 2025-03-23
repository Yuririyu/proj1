import React from "react";
import "./App.css";
import TopHeader from "./components/TopHeader";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
      {/* Top Header */}
      <TopHeader />

      {/* Main Page Content */}
      <MainPage />
    </div>
  );
}

export default App;
