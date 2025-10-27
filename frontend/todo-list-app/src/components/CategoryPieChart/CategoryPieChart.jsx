import styled from 'styled-components';
import EmptyState from '../EmptyState';
import PieChartWrapper from '../wrappers/PieChartWrapper';
import { COLORS } from '../../utils/constants';

const Heading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: ${COLORS.textDark};
`;

const CategoryPieChart = ({ data }) => {
  if (!data || data.length === 0)
    return <EmptyState message="No Category Data" />;

  return (
    <div>
      <Heading>Task Categories</Heading>
      <PieChartWrapper
        data={data}
        dataKey="value"
        nameKey="name"
        colors={COLORS.chartPalette}
      />
    </div>
  );
};

export default CategoryPieChart;
