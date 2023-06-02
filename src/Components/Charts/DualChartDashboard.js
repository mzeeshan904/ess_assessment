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
  Grid,
  Typography,
} from "@material-ui/core";
import Container from "@mui/material/Container";
import { Select, Box, Input } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { AreaChart, Area } from "recharts";

const DualChartDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // const [selectedNumber, setSelectedNumber] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedChartType, setSelectedChartType] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [calculatedAverage, setCalculatedAverage] = useState("");

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

  // const handleFilterChange = (event) => {
  //   const filterType = event.target.name;
  //   const filterValue = event.target.value;

  //   if (filterType === "number") {
  //     setSelectedNumber(filterValue);
  //   }
  // };

  // const applyFilters = () => {
  //   let filtered = chartData;
  //   if (selectedNumber) {
  //     filtered = chartData.slice(0, parseInt(selectedNumber));
  //   }
  //   setFilteredData(filtered);
  //   setPage(1);
  // };

  const handleDownloadFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
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

    saveAs(blob, `chart_data.${fileExtension}`);
  };

  // const calculateTotal = () => {
  //   const totalData = filteredData.map((row) => {
  //     const total = Object.values(row).reduce((acc, value) => {
  //       if (typeof value === "number") {
  //         return acc + value;
  //       }
  //       return acc;
  //     }, 0);

  //     return {
  //       ...row,
  //       total,
  //     };
  //   });

  //   return totalData;
  // };

  // const calculateAverage = () => {
  //   const averageData = filteredData.map((row) => {
  //     const values = Object.values(row).filter(
  //       (value) => typeof value === "number",
  //     );
  //     const total = values.reduce((acc, value) => acc + value, 0);
  //     const average = total / values.length || 0;

  //     return {
  //       ...row,
  //       average,
  //     };
  //   });

  //   const averageString = averageData.join(", ");
  //   console.log(averageString);
  //   // setCalculatedAverage(averageString);
  //   // return averageData;
  // };

  const renderLineChart = () => {
    if (filteredData.length === 0 || selectedChartType !== "line") {
      return null;
    }

    const dataKeys = Object.keys(filteredData[0]).filter(
      (key) => key !== "name",
    );

    return (
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={filteredData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={getChartColor(index)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = () => {
    if (filteredData.length === 0 || selectedChartType !== "bar") {
      return null;
    }

    const dataKeys = Object.keys(filteredData[0]).filter(
      (key) => key !== "name",
    );

    return (
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={filteredData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={getChartColor(index)} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderPieChart = () => {
    if (filteredData.length === 0 || selectedChartType !== "pie") {
      return null;
    }

    const dataKeys = Object.keys(filteredData[0]).filter(
      (key) => key !== "name",
    );

    const colors = getChartColors(dataKeys.length);

    return (
      <ResponsiveContainer width="100%" height={450}>
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={filteredData}
            dataKey="pv"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={180}
            label
          >
            {dataKeys.map((key, index) => (
              <Cell key={key} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const getChartColor = (index) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6e6e"];
    return colors[index % colors.length];
  };

  const getChartColors = (count) => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6e6e"];
    return colors.slice(0, count);
  };

  const filteredDataPagination = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const renderAreaChart = () => {
    if (filteredData.length === 0 || selectedChartType !== "area") {
      return null;
    }

    const dataKeys = Object.keys(filteredData[0]).filter(
      (key) => key !== "name",
    );

    return (
      <ResponsiveContainer width="100%" height={450}>
        <AreaChart data={filteredData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={getChartColor(index)}
              fill={getChartColor(index)} // Add this line to fill the area
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Container style={{ width: "100%" }}>
      {/* <Box>
        <Box>
          Number of Results:
          <Select
            name="number"
            value={selectedNumber}
            onChange={handleFilterChange}
            sx={{ marginLeft: 2, width: 111, height: 36, fontSize: "1rem" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="20">20</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={applyFilters}
            sx={{ marginLeft: 2, height: 36, fontSize: "1rem" }}
          >
            Apply
          </Button>
        </Box>
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "50px",
        }}
      >
        <Box>
          <Input
            type="file"
            accept=".csv, .json"
            disableUnderline
            onChange={handleFileChange}
          />
        </Box>
        <Box>
          <Typography>Chart : </Typography>
          <Select
            value={selectedChartType}
            onChange={handleChartTypeChange}
            sx={{ height: "26px", width: "80px" }}
          >
            <MenuItem value="line">Line</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="pie">Pie</MenuItem>
            <MenuItem value="area">Area</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography>Download : </Typography>
          <Select
            value={selectedFormat}
            onChange={handleDownloadFormatChange}
            sx={{ height: "26px", width: "80px" }}
          >
            <MenuItem value="csv" onClick={downloadData}>
              CSV
            </MenuItem>
            <MenuItem value="excel" onClick={downloadData}>
              Excel
            </MenuItem>
            <MenuItem value="json" onClick={downloadData}>
              JSON
            </MenuItem>
          </Select>
        </Box>
      </Box>

      {/* <Grid container spacing={1} sx={{height:'100px', border:'1px solid black'}}>
        <Grid item xs={4} sm={4} lg={4} sx={{height:'36px'}}>
          <Input
            type="file"
            accept=".csv, .json"
            disableUnderline
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={4} sm={4} lg={4} >
          <Box display="flex" alignItems="center">
            <Typography>Chart : </Typography>
            <Select
              value={selectedChartType}
              onChange={handleChartTypeChange}
              sx={{height:'26px', width:'80px'}}
            >
              <MenuItem value="line">Line</MenuItem>
              <MenuItem value="bar">Bar</MenuItem>
              <MenuItem value="pie">Pie</MenuItem>
              <MenuItem value="area">Area</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Box display="flex" alignItems="center">
          <Typography>Number of Results:</Typography>
          <Select
            name="number"
            value={selectedNumber}
            onChange={handleFilterChange}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="20">20</MenuItem>
          </Select>
          <Button variant="contained" onClick={applyFilters}>
            Apply
          </Button>
        </Box>
      </Grid>
        <Grid item xs={4} sm={4} lg={4} sx={{height:'36px'}}>
          <Box display="flex" alignItems="center">
            <Typography>Download : </Typography>
            <Select
              value={selectedFormat}
              onChange={handleDownloadFormatChange}
              sx={{height:'26px', width:'80px'}}
            >
              <MenuItem value="csv"  onClick={downloadData}>CSV</MenuItem>
              <MenuItem value="excel"  onClick={downloadData}>Excel</MenuItem>
              <MenuItem value="json"  onClick={downloadData}>JSON</MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid> */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        {renderLineChart()}
        {renderBarChart()}
        {renderPieChart()}
        {renderAreaChart()}
      </Box>
      <Container sx={{ marginTop: 2 }}>
        <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                {filteredData.length > 0 &&
                  Object.keys(filteredData[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDataPagination.length > 0 ? (
                filteredDataPagination.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, index) => (
                      <TableCell key={index}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Container>

      {/* 
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          onClick={calculateTotal}
          sx={{ marginRight: 2, height: 36, fontSize: "1rem" }}
        >
          Calculate Total
        </Button>
        <Button
          variant="contained"
          onClick={calculateAverage}
          sx={{ marginRight: 2, height: 36, fontSize: "1rem" }}
        >
          Calculate Average
        </Button>
        <Typography>{calculatedAverage}</Typography>
      </Box> */}
    </Container>
  );
};

export default DualChartDashboard;
