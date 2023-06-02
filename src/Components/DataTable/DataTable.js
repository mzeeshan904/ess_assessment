// import React, { useState } from "react";
// import { Box, Button, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
// import { parse } from "papaparse";

// const DataTable = () => {
//   const [tableData, setTableData] = useState([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const data = event.target.result;
//       const fileType = file.name.split(".").pop().toLowerCase();

//       if (fileType === "csv") {
//         parseCSV(data);
//       } else if (fileType === "json") {
//         parseJSON(data);
//       }
//     };

//     reader.readAsText(file);
//   };

//   const parseCSV = (data) => {
//     const parsedData = parse(data, { header: true }).data;
//     setTableData(parsedData);
//   };

//   const parseJSON = (data) => {
//     const parsedData = JSON.parse(data);
//     setTableData(parsedData);
//   };

//   return (
//     <Box sx={{ padding: "1rem" }}>
//       <Box sx={{ marginBottom: "1rem" }}>
//         <Input type="file" accept=".csv, .json" onChange={handleFileChange} />
//       </Box>
//       {tableData.length > 0 ? (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 {Object.keys(tableData[0]).map((header) => (
//                   <TableCell key={header}>{header}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.map((row, index) => (
//                 <TableRow key={index}>
//                   {Object.values(row).map((cell, index) => (
//                     <TableCell key={index}>{cell}</TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <Typography variant="body1">No data to display</Typography>
//       )}
//     </Box>
//   );
// };

// export default DataTable;

import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  //   Typography,
} from "@mui/material";
import { parse } from "papaparse";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const DataTable = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
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
    const parsedData = parse(data, { header: true }).data;
    setTableData(parsedData);
    setFilteredData(parsedData);
  };

  const parseJSON = (data) => {
    const parsedData = JSON.parse(data);
    setTableData(parsedData);
    setFilteredData(parsedData);
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;

    if (filterValue === "all") {
      setFilteredData(tableData);
    } else {
      const filtered = tableData.filter((row) => row.category === filterValue);
      setFilteredData(filtered);
    }
  };

  const handleDownloadFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const downloadData = () => {
    let dataToDownload = filteredData;

    if (selectedFormat === "csv") {
      const csvData = parseToCSV(dataToDownload);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "filtered_data.csv");
    } else if (selectedFormat === "json") {
      const jsonData = JSON.stringify(dataToDownload);
      const blob = new Blob([jsonData], { type: "application/json" });
      saveAs(blob, "filtered_data.json");
    } else if (selectedFormat === "excel") {
      const excelData = parseToExcel(dataToDownload);
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(excelData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      const excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAs(
        new Blob([excelFile], { type: "application/octet-stream" }),
        "filtered_data.xlsx",
      );
    }
  };

  const parseToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvData = [headers.join(",")];

    for (let row of data) {
      const values = headers.map((header) => row[header]);
      csvData.push(values.join(","));
    }

    return csvData.join("\n");
  };

  const parseToExcel = (data) => {
    const headers = Object.keys(data[0]);
    const excelData = [headers];

    for (let row of data) {
      const values = headers.map((header) => row[header]);
      excelData.push(values);
    }

    return excelData;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Input type="file" accept=".csv, .json" onChange={handleFileChange} />
        <Select
          value="all"
          onChange={handleFilterChange}
          sx={{ marginLeft: 2, width: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="category1">Category 1</MenuItem>
          <MenuItem value="category2">Category 2</MenuItem>
          <MenuItem value="category3">Category 3</MenuItem>
        </Select>
        <Button
          onClick={downloadData}
          disabled={!selectedFormat}
          sx={{ marginLeft: 2 }}
        >
          Download
        </Button>
        <Select
          value={selectedFormat}
          onChange={handleDownloadFormatChange}
          sx={{ marginLeft: 2, width: 150 }}
        >
          <MenuItem value="csv">CSV</MenuItem>
          <MenuItem value="json">JSON</MenuItem>
          <MenuItem value="excel">Excel</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(filteredData[0] || {}).map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
