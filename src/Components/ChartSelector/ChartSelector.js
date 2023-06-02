import React from "react";
import { Select, MenuItem } from "@material-ui/core";

const ChartSelector = ({ selectedChartType, onChartTypeChange }) => {
  return (
    <div>
      Chart
      <Select
        value={selectedChartType}
        onChange={onChartTypeChange}
      >
        <MenuItem value="line">Line Chart</MenuItem>
        <MenuItem value="bar">Bar Chart</MenuItem>
        <MenuItem value="pie">Pie Chart</MenuItem>
      </Select>
    </div>
  );
};

export default ChartSelector;
