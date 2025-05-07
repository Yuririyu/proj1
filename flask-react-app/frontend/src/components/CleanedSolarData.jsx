import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CleanedSolarData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const url = `https://midcdmz.nrel.gov/apps/daily.pl?site=UTPASRL&start=20110901&yr=${year}&mo=${month}&dy=${day}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        console.log('Raw CSV Data:', text); // Log raw CSV data for debugging
        const result = Papa.parse(text, { header: true });
        console.log('Parsed Data:', result.data); // Log parsed data

        // Clean the parsed data
        const cleaned = result.data.filter(row =>
          Object.values(row).some(val => val && val.trim() !== '') // Improved cleaning logic
        );
        console.log('Cleaned Data:', cleaned); // Log cleaned data
        setData(cleaned);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching or parsing data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading solar data...</p>;
  }

  if (data.length === 0) {
    return <p>No solar data available for the selected period.</p>; // Handle empty data
  }

  return (
    <div>
      <h2>📈 Cleaned Solar Data</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            {Object.keys(data[0]).map((col, i) => (
              <th key={i} style={{ border: '1px solid black', padding: '5px' }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j} style={{ border: '1px solid black', padding: '5px' }}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CleanedSolarData;