import React from "react";
import * as d3 from "d3";

const FileUploader = ({ onFileChange }) => {
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
    onFileChange(parsedData);
  };

  const parseJSON = (data) => {
    const parsedData = JSON.parse(data);
    onFileChange(parsedData);
  };

  return (
    <input type="file" accept=".csv, .json" onChange={handleFileChange} />
  );
};

export default FileUploader;
