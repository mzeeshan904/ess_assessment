import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import * as d3 from "d3";
import { saveAs } from "file-saver";
import { Box, Button, Input, MenuItem, Select } from "@mui/material";

const BarChartDashBoard = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const fileType = file.name.split(".").pop().toLowerCase();

      if (fileType === "csv") {
        parseCSV(data);
      } else if (fileType === "json") {
        parseJSON(data);
      }
    };

    reader.readAsText(file);
  };

  const parseCSV = (data) => {
    const parsedData = d3.csvParse(data);
    setChartData(parsedData);
    setFilteredData(parsedData);
  };

  const parseJSON = (data) => {
    const parsedData = JSON.parse(data);
    setChartData(parsedData);
    setFilteredData(parsedData);
  };

  const handleFilterChange = (event) => {
    const filterType = event.target.name;
    const filterValue = event.target.value;

    if (filterType === "players") {
      setSelectedPlayers(filterValue);
    }
  };

  const handleDownloadFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const applyFilters = () => {
    let filtered = chartData;
    if (selectedPlayers) {
      filtered = chartData.slice(0, parseInt(selectedPlayers));
    }
    setFilteredData(filtered);
  };

  const colorPalette = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a05195"];

  const renderBars = () => {
    if (filteredData.length === 0) {
      return null;
    }

    return Object.keys(filteredData[0]).map((key, index) => {
      if (key !== "name") {
        const color = colorPalette[index % colorPalette.length];
        return <Bar key={key} dataKey={key} fill={color} />;
      }
      return null;
    });
  };


const downloadData = () => {
  let blob, fileExtension;

  switch (selectedFormat) {
    case 'csv':
      const csvData = d3.csvFormat(filteredData);
      blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      fileExtension = 'csv';
      break;
    case 'excel':
      const excelData = d3.csvFormat(filteredData);
      blob = new Blob([excelData], { type: 'application/vnd.ms-excel' });
      fileExtension = 'xls';
      break;
    case 'json':
      const jsonData = JSON.stringify(filteredData);
      blob = new Blob([jsonData], { type: 'application/json' });
      fileExtension = 'json';
      break;
    default:
      return;
  }

  saveAs(blob, `chart_data.${fileExtension}`);
};

return (
  <Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "80px",
        padding: "0px 1rem",
      }}
    >
      <Input type="file" accept=".csv, .json" onChange={handleFileChange} />
      <Box>
        Number of Results:
        <Select name="players" value="Number of Results:" onChange={handleFilterChange} sx={{ marginLeft: 2, width: 111, height:36 }}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="15">15</MenuItem>
          <MenuItem value="20">20</MenuItem>
        </Select>
        <Button onClick={applyFilters} variant="contained">Apply Filters</Button>
      </Box>

      <Box>
        Download:
        <Select name="format" onChange={handleDownloadFormatChange} sx={{ marginLeft: 2, width: 111, height:36 }}>
          <MenuItem value="">Select Format</MenuItem>
          <MenuItem value="csv">CSV</MenuItem>
          <MenuItem value="excel">Excel</MenuItem>
          <MenuItem value="json">JSON</MenuItem>
        </Select>
        <Button onClick={downloadData} disabled={!selectedFormat} variant="contained">
          Download
        </Button>
      </Box>
    </Box>
    <Box style={{ width: '100%', height: '500px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {renderBars()}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Box>
);

};

export default BarChartDashBoard;
