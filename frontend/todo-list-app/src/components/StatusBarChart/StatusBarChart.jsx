import styled from 'styled-components';
import BarChartWrapper from '../wrappers/BarChartWrapper';
import { COLORS } from '../../utils/constants';

const Heading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: ${COLORS.textDark};
`;

const StatusBarChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No status data</p>;

  // Optional: map colors dynamically based on status
  const statusColorMap = {
    Completed: COLORS.primary,
    Pending: COLORS.danger,
  };

  const coloredData = data.map((item) => ({
    ...item,
    fill: statusColorMap[item.name] || COLORS.primary,
  }));

  return (
    <div>
      <Heading>Task Status</Heading>
      <BarChartWrapper
        data={coloredData}
        dataKey="count"
        nameKey="name"
        color={null} // allows per-bar colors via data.fill
      />
    </div>
  );
};

export default StatusBarChart;
