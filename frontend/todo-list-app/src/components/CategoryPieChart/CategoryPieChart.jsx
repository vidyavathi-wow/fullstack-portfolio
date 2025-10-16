import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';
import EmptyState from '../EmptyState';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Heading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CategoryPieChart = ({ data }) => {
  if (!data || data.length === 0)
    return <EmptyState message="No Category Data">No category data</EmptyState>;

  return (
    <div>
      <Heading>Task Categories</Heading>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryPieChart;
