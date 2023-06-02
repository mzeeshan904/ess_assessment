import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getChartColor = (index) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6e6e"];
  return colors[index % colors.length];
};


const LineChartComponent = ({ filteredData }) => {
    // if (filteredData.length === 0) {
    //   return null;
    // }
    if (!filteredData || filteredData.length === 0) {
      return null; // Add a condition to handle when filteredData is undefined or empty
    }
    const dataKeys = Object.keys(filteredData[0]).filter((key) => key !== "name");
  
    return (
      <ResponsiveContainer width="100%" height={300}>
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
  

  export default LineChartComponent;