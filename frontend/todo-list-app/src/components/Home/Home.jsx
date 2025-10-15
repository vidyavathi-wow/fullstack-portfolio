import { useEffect, useState } from "react";
import CategoryPieChart from "../CategoryPieChart/CategoryPieChart.jsx";
import StatusBarChart from "../StatusBarChart/StatusBarChart.jsx";

const Home = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todoAnalytics"));
    setAnalytics(data);
  }, []);

  if (!analytics) return <p>No analytics data available</p>;

  const categoryData = Object.entries(analytics.categoryCount).map(
    ([name, value]) => ({ name, value })
  );

  const statusData = [
    { name: "Completed", count: analytics.completed },
    { name: "Pending", count: analytics.pending },
  ];

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "40px" }}>
      <h2>📊 Dashboard Analytics</h2>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        <CategoryPieChart data={categoryData} />
        <StatusBarChart data={statusData} />
      </div>

      <div>
        <h4>Total Tasks: {analytics.total}</h4>
        <h4>Completed: {analytics.completed}</h4>
        <h4>Pending: {analytics.pending}</h4>
      </div>
    </div>
  );
};

export default Home;
