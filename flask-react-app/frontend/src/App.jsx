import React, { useState } from "react";
import "./App.css";

// Import your reusable components
import Header from "./components/Header";
import DataFilter from "./components/DataFilter";
import DataTable from "./components/DataTable";

const App = () => {
  const [data, setData] = useState([]);

  const handleFilter = async (year, day) => {
    const response = await fetch(
      `http://127.0.0.1:5000/api/data?year=${year}&day=${day}`
    );
    const filteredData = await response.json();
    setData(filteredData);
  };

  return (
    <div className="App">
      <Header />
      <div className="content">
        <DataFilter onFilter={handleFilter} />
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default App;
