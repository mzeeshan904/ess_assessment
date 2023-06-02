// import React, { useState } from 'react';
// import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
// import Papa from 'papaparse';

// const DataVisualization = () => {
//   const [data, setData] = useState(null);
//   const [chartType, setChartType] = useState('bar');

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       const fileContent = reader.result;
//       // Parse the file content based on its type (CSV or JSON)
//       let parsedData = null;
//       if (file.type === 'text/csv') {
//         parsedData = parseCSV(fileContent);
//       } else if (file.type === 'application/json') {
//         parsedData = JSON.parse(fileContent);
//       }
//       setData(parsedData);
//     };

//     reader.readAsText(file);
//   };

//   const parseCSV = (csvContent) => {
//     const { data } = Papa.parse(csvContent, { header: true });
//     return data;
//   };

//   const handleChartTypeChange = (event) => {
//     setChartType(event.target.value);
//   };

//   const renderChart = () => {
//     if (!data) {
//       return <p>Please upload a file.</p>;
//     }

//     switch (chartType) {
//       case 'bar':
//         return (
//           <BarChart width={500} height={300} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="label" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="value" fill="#8884d8" />
//           </BarChart>
//         );
//       case 'line':
//         return (
//           <LineChart width={500} height={300} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="label" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="value" stroke="#8884d8" />
//           </LineChart>
//         );
//       case 'pie':
//         return (
//           <PieChart width={500} height={300}>
//             <Pie dataKey="value" data={data} cx={200} cy={150} outerRadius={60} fill="#8884d8" label />
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".csv,.json" onChange={handleFileUpload} />
//       <select value={chartType} onChange={handleChartTypeChange}>
//         <option value="bar">Bar Chart</option>
//         <option value="line">Line Chart</option>
//         <option value="pie">Pie Chart</option>
//       </select>
//       {renderChart()}
//     </div>
//   );
// };

// export default DataVisualization;



import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import Papa from 'papaparse';

const DataVisualization = () => {
  const [data, setData] = useState(null);
  const [chartType, setChartType] = useState('bar');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;
      // Parse the file content based on its type (CSV or JSON)
      let parsedData = null;
      if (file.type === 'text/csv') {
        parsedData = parseCSV(fileContent);
      } else if (file.type === 'application/json') {
        parsedData = JSON.parse(fileContent);
      }
      setData(parsedData);
    };

    reader.readAsText(file);
  };

  const parseCSV = (csvContent) => {
    const { data } = Papa.parse(csvContent, { header: true });
    return data;
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const renderChart = () => {
    if (!data) {
      return <p>Please upload a file.</p>;
    }

    switch (chartType) {
      case 'bar':
        return (
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeDasharray="0" />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart width={500} height={300}>
            <Pie dataKey="value" data={data} cx={200} cy={150} outerRadius={60} fill="#8884d8" label />
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <input type="file" accept=".csv,.json" onChange={handleFileUpload} />
      <select value={chartType} onChange={handleChartTypeChange}>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
      {renderChart()}
    </div>
  );
};

export default DataVisualization;
