import React, { useState } from "react";

const DataFilter = ({ onFilter }) => {
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(year, day); // Pass filter parameters to parent
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </label>
      <label>
        Day:
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </label>
      <button type="submit">Filter</button>
    </form>
  );
};

export default DataFilter;
