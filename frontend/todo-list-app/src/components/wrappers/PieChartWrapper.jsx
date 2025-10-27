import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

/**
 * Wrapper for Recharts PieChart.
 * Abstracts away library details so you can easily swap chart libraries later.
 */
const PieChartWrapper = ({ data, dataKey, nameKey, colors }) => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartWrapper;
