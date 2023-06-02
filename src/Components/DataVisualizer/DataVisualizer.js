import React, { useState } from "react";
import FileUploader from "../FileUploader/FileUploader";
import ChartSelector from "../ChartSelector/ChartSelector";
import FilterForm from "../FilterForm/FilterForm";
import DownloadForm from "../DownloadForm/DownloadForm";
import ChartsSection from "../ChartsSection/ChartsSection";
import VisualizationTable from "../VisualizationTable/VisualizationTable"
import TablePagination from "@material-ui/core/TablePagination";

const DataVisualizer = () => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("csv");
  const [selectedChartType, setSelectedChartType] = useState("line");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFileChange = (data) => {
    setChartData(data);
    setFilteredData(data);
  };

  const handleFilterChange = (filterType, filterValue) => {
    if (filterType === "players") {
      setSelectedPlayers(filterValue);
    }
  };

  const onApplyFilters = () => {
    let filteredChartData = chartData;
    if (selectedPlayers !== "") {
      filteredChartData = filteredChartData.slice(0, selectedPlayers);
    }
    setFilteredData(filteredChartData);
  };

  const handleDownloadFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const onDownloadData = () => {
    // Download functionality based on the selectedFormat
    if (selectedFormat === "csv") {
      downloadCSV();
    } else if (selectedFormat === "json") {
      downloadJSON();
    }
  };

  const downloadCSV = () => {
    // Download the data as CSV file
    const csvContent = "data:text/csv;charset=utf-8," + chartDataToCSV();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const chartDataToCSV = () => {
    // Convert chart data to CSV format
    let csvContent = "Player,PV,UV\n";
    chartData.forEach((item) => {
      csvContent += `${item.player},${item.pv},${item.uv}\n`;
    });
    return csvContent;
  };

  const downloadJSON = () => {
    // Download the data as JSON file
    const jsonContent = JSON.stringify(chartData, null, 2);
    const encodedUri = encodeURI(
      "data:application/json;charset=utf-8," + jsonContent
    );
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.json");
    document.body.appendChild(link);
    link.click();
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <FileUploader onFileChange={handleFileChange} />
      <ChartSelector
        selectedChartType={selectedChartType}
        onChartTypeChange={handleChartTypeChange}
      />
      <FilterForm
        selectedPlayers={selectedPlayers}
        onFilterChange={handleFilterChange}
        onApplyFilters={onApplyFilters}
      />
      <DownloadForm
        selectedFormat={selectedFormat}
        onDownloadFormatChange={handleDownloadFormatChange}
        onDownloadData={onDownloadData}
      />
      <ChartsSection
        selectedChartType={selectedChartType}
        filteredData={filteredData}
      />
      <VisualizationTable
        filteredData={filteredData}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DataVisualizer;
