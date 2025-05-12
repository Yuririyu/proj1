import React, { useState, useEffect } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Label
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Loader
const Loader = ({ theme }) => (
  <div style={{
    display: "flex", justifyContent: "center", alignItems: "center",
    height: "600px", fontSize: "18px",
    color: theme === "dark" ? "#fff" : "#333", flexDirection: "column"
  }}>
    <div style={{
      border: "6px solid #f3f3f3",
      borderTop: `6px solid ${theme === "dark" ? "#0ff" : "#3366cc"}`,
      borderRadius: "50%",
      width: "50px", height: "50px",
      animation: "spin 1s linear infinite", marginBottom: "1rem"
    }} />
    Loading solar data...
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

// Tooltip
const CustomTooltip = ({ active, payload, label, theme }) => {
  const isDark = theme === "dark";
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: isDark ? "#222" : "#fff",
        border: `1px solid ${isDark ? "#888" : "#ccc"}`,
        borderRadius: "10px",
        padding: "10px 14px",
        boxShadow: isDark ? "0 2px 10px rgba(0,255,255,0.2)" : "0 2px 10px rgba(0,0,0,0.1)",
        fontSize: "14px", color: isDark ? "#fff" : "#333", lineHeight: "1.5"
      }}>
        <p style={{ marginBottom: "6px", fontWeight: "bold" }}>{label} hrs</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.stroke }}>
            {entry.name}: <strong>{entry.value} W/m²</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Legend
const CustomLegend = ({ payload, theme }) => {
  const isDark = theme === "dark";
  return (
    <div style={{
      display: "flex", gap: "1.5rem", fontSize: "14px",
      color: isDark ? "#fff" : "#333", marginBottom: "1rem", justifyContent: "center"
    }}>
      {payload.map((entry, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            width: "12px", height: "12px", backgroundColor: entry.color, borderRadius: "50%"
          }} />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const SolarGraph = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [theme, setTheme] = useState("light");
  const [opacity, setOpacity] = useState(1);
  const [loading, setLoading] = useState(false);
  const isDark = theme === "dark";

  const getDataForDate = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    return hours.map((time, i) => ({
      time,
      Global: Math.max(0, Math.round(1000 * Math.sin((Math.PI * i) / 24))),
      Direct: Math.max(0, Math.round(700 * Math.sin((Math.PI * i) / 24))),
      Diffuse: Math.max(0, Math.round(300 * Math.sin((Math.PI * i) / 24))),
    }));
  };

  const graphData = getDataForDate(selectedDate);

  useEffect(() => {
    setOpacity(0);
    setLoading(true);
    const timer = setTimeout(() => {
      setOpacity(1);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      padding: "2rem",
      background: isDark
        ? "linear-gradient(to bottom right, #1c1c1c, #121212)"
        : "linear-gradient(to bottom right, #f4f7f9, #e0eafc)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: isDark ? "#fff" : "#333",
      transition: "background 0.5s"
    }}>
         <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#0a4b74" }}>
          Solar Radiation Graphs
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto" }}>
          Visualize daily solar radiation trends with interactive graphs. 
          Dive into key insights for your analysis.
        </p>
      </div>
      
      {/* Theme + Date */}
      <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
          style={{
            padding: "8px 16px",
            background: isDark ? "#333" : "#fff",
            color: isDark ? "#fff" : "#333",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          Switch to {theme === "light" ? "Dark 🌚" : "Light 🌞"} Mode
        </button>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="date-picker"
          popperPlacement="bottom"
        />
      </div>

      {/* Chart container */}
      <div style={{
        background: isDark ? "#222" : "#ffffff",
        padding: "2rem",
        borderRadius: "20px",
        boxShadow: isDark
          ? "0 4px 20px rgba(0,255,255,0.2)"
          : "0 4px 20px rgba(0,0,0,0.1)",
        width: "90%",
        maxWidth: "1200px",
        height: "600px",
        border: isDark ? "1px solid #0ff" : "1px solid #ddd",
        opacity,
        transition: "opacity 0.5s"
      }}>
        {loading ? (
          <Loader theme={theme} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={graphData} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
              <defs>
                <linearGradient id="colorGlobal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3366cc" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#3366cc" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00cc66" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#00cc66" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDiffuse" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffcc00" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#ffcc00" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#555" : "#ccc"} />
              <XAxis
                dataKey="time"
                stroke={isDark ? "#aaa" : "#333"}
                tick={{ fontSize: 10 }}
                tickFormatter={(time) => `${time} hrs`}
              />
              <YAxis
                stroke={isDark ? "#aaa" : "#333"}
                tick={{ fontSize: 10 }}
                tickFormatter={(val) => `${val} W/m²`}
              >
                <Label
                  value="Solar Radiation"
                  angle={-90}
                  position="insideLeft"
                  style={{
                    textAnchor: "middle",
                    fill: isDark ? "#aaa" : "#333",
                    fontSize: 12
                  }}
                />
              </YAxis>

              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend content={<CustomLegend theme={theme} />} />

              <Area type="monotone" dataKey="Global" stroke="#3366cc" fill="url(#colorGlobal)" strokeWidth={3} />
              <Area type="monotone" dataKey="Direct" stroke="#00cc66" fill="url(#colorDirect)" strokeWidth={3} />
              <Area type="monotone" dataKey="Diffuse" stroke="#ffcc00" fill="url(#colorDiffuse)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SolarGraph;