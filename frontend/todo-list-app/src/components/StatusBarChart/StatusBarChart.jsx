import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import styled from 'styled-components';

const StatusBarChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No status data</p>;

  const Heading = styled.h3`
    text-align: center;
    margin-bottom: 20px;
  `;

  return (
    <div>
      <Heading>Task Status</Heading>
      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default StatusBarChart;
