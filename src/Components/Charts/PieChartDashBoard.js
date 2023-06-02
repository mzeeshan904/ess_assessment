import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import * as d3 from 'd3';

const PieChartDashboard = () => {
  const [chartData, setChartData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const fileType = file.name.split('.').pop().toLowerCase();

      if (fileType === 'csv') {
        parseCSV(data);
      } else if (fileType === 'json') {
        parseJSON(data);
      }
    };

    reader.readAsText(file);
  };

  const parseCSV = (data) => {
    const parsedData = d3.csvParse(data);
    setChartData(parsedData);
  };

  const parseJSON = (data) => {
    const parsedData = JSON.parse(data);
    setChartData(parsedData);
  };

  const renderPie = () => {
    if (chartData.length === 0) {
      return null;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={`#${((index + 1) * 111) % 16777215}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div>
      <input type="file" accept=".csv, .json" onChange={handleFileChange} />
      {renderPie()}
    </div>
  );
};

export default PieChartDashboard;
