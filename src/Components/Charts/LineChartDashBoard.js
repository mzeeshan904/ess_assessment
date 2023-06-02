import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import * as d3 from "d3";
import { saveAs } from "file-saver";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Button,
} from "@material-ui/core";
import { Select, Box, Input } from "@mui/material";

const DualChartDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedChartType, setSelectedChartType] = useState("");

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
      } else {
        // Show error for unsupported file format
        alert("Unsupported file format. Only CSV and JSON files are allowed.");
      }
    };

    reader.readAsText(file);
  };

  const parseCSV = (data) => {
    const parsedData = d3.csvParse(data, (d) => ({
      ...d,
      pv: +d.pv,
      uv: +d.uv,
    }));
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

  const applyFilters = () => {
    let filtered = chartData;
    if (selectedPlayers) {
      filtered = chartData.slice(0, parseInt(selectedPlayers));
    }
    setFilteredData(filtered);
  };

  const handleDownloadFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };

  const downloadData = () => {
    let blob, fileExtension;

    switch (selectedFormat) {
      case "csv":
        const csvData = d3.csvFormat(filteredData);
        blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
        fileExtension = "csv";
        break;
      case "excel":
        const excelData = d3.csvFormat(filteredData);
        blob = new Blob([excelData], { type: "application/vnd.ms-excel" });
        fileExtension = "xls";
        break;
      case "json":
        const jsonData = JSON.stringify(filteredData);
        blob = new Blob([jsonData], { type: "application/json" });
        fileExtension = "json";
        break;
      default:
        return;
    }

    saveAs(blob, `data.${fileExtension}`);
  };

  const renderLineChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = () => {
    return (
      <ResponsiveContainer width="100%" height={800}>
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderPieChart = () => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#b04e4e", "#cd82ad"];

    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="pv"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
      <input type="file" onChange={handleFileChange} />
      <br />
      <Box sx={{ width: 200 }}>
        <Input
          type="number"
          placeholder="Number of players"
          name="players"
          onChange={handleFilterChange}
        />
      </Box>
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
      <br />
      <Select
        value={selectedFormat}
        onChange={handleDownloadFormatChange}
        style={{ width: 200 }}
      >
        <MenuItem value="">Select Format</MenuItem>
        <MenuItem value="csv">CSV</MenuItem>
        <MenuItem value="excel">Excel</MenuItem>
        <MenuItem value="json">JSON</MenuItem>
      </Select>
      <Button variant="contained" onClick={downloadData}>
        Download
      </Button>
      <br />
      <Select
        value={selectedChartType}
        onChange={handleChartTypeChange}
        style={{ width: 200 }}
      >
        <MenuItem value="">Select Chart Type</MenuItem>
        <MenuItem value="line">Line Chart</MenuItem>
        <MenuItem value="bar">Bar Chart</MenuItem>
        <MenuItem value="pie">Pie Chart</MenuItem>
      </Select>
      <br />
      {selectedChartType === "line" && renderLineChart()}
      {selectedChartType === "bar" && renderBarChart()}
      {selectedChartType === "pie" && renderPieChart()}
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>PV</TableCell>
              <TableCell>UV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((data) => (
              <TableRow key={data.name}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.pv}</TableCell>
                <TableCell>{data.uv}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DualChartDashboard;
