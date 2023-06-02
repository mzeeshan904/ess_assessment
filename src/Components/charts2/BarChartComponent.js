import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";



const getChartColor = (index) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6e6e"];
  return colors[index % colors.length];
};



const BarChartComponent = ({ filteredData }) => {
    if (filteredData.length === 0) {
      return null;
    }
  
    const dataKeys = Object.keys(filteredData[0]).filter((key) => key !== "name");
  
    return (
      <ResponsiveContainer width="100%" height={300}>
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

  export default BarChartComponent;
  