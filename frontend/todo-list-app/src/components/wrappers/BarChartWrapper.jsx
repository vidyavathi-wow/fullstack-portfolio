import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

/**
 * Wrapper for Recharts BarChart.
 * Supports per-bar color (if provided via data.fill).
 */
const BarChartWrapper = ({ data, dataKey, nameKey, color }) => {
  return (
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={nameKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey={dataKey}
        fill={color || '#8884d8'} // fallback if color not passed
        isAnimationActive={false}
      >
        {data.map((entry, index) =>
          entry.fill ? <Cell key={`cell-${index}`} fill={entry.fill} /> : null
        )}
      </Bar>
    </BarChart>
  );
};

export default BarChartWrapper;
