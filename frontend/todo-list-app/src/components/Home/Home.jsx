import { useEffect, useState } from 'react';
import CategoryPieChart from '../CategoryPieChart/CategoryPieChart.jsx';
import StatusBarChart from '../StatusBarChart/StatusBarChart.jsx';
import styles from './Home.module.css';
import EmptyState from '../EmptyState.jsx';

const Home = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todoAnalytics'));
    setAnalytics(data);
  }, []);

  if (!analytics) return <EmptyState>No analytics data available</EmptyState>;

  const categoryData = Object.entries(analytics.categoryCount).map(
    ([name, value]) => ({ name, value })
  );

  const statusData = [
    { name: 'Completed', count: analytics.completed },
    { name: 'Pending', count: analytics.pending },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📊 Dashboard Analytics</h2>

      <div className={styles.charts}>
        <div className={styles.chartBox}>
          <CategoryPieChart data={categoryData} />
        </div>
        <div className={styles.chartBox}>
          <StatusBarChart data={statusData} />
        </div>
      </div>

      <div className={styles.summary}>
        <h4>Total Tasks: {analytics.total}</h4>
        <h4>Completed: {analytics.completed}</h4>
        <h4>Pending: {analytics.pending}</h4>
      </div>
    </div>
  );
};

export default Home;
