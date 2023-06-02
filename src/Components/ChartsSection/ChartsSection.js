import React from "react";
import BarChartComponent from "../charts2/BarChartComponent";
import LineChartComponent from "../charts2/LineChartComponent";
import PieChartComponent from "../charts2/PieChartComponent"
// import { LineChart, BarChart, PieChart } from "../";

const ChartsSection = ({ selectedChartType, filteredData }) => {
  const renderLineChart = () => {
    return <LineChartComponent data={filteredData} />;
  };

  const renderBarChart = () => {
    return <BarChartComponent data={filteredData} />;
  };

  const renderPieChart = () => {
    return <PieChartComponent data={filteredData} />;
  };

  return (
    <div>
      {selectedChartType === "line" && renderLineChart()}
      {selectedChartType === "bar" && renderBarChart()}
      {selectedChartType === "pie" && renderPieChart()}
    </div>
  );
};

export default ChartsSection;
