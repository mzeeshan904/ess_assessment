import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";



const getChartColors = (count) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff6e6e"];
  return colors.slice(0, count);
};



const PieChartComponent = ({ filteredData }) => {
    if (filteredData.length === 0) {
      return null;
    }
  
    const dataKeys = Object.keys(filteredData[0]).filter((key) => key !== "name");
    const colors = getChartColors(dataKeys.length);
  
    return (
      <ResponsiveContainer width="100%" height={600}>
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
  

  export default PieChartComponent;