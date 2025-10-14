import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Home = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todoAnalytics"));
    setAnalytics(data);
  }, []);

  if (!analytics) return <p>No analytics data available</p>;

  // Pie chart data: category distribution
  const categoryData = Object.entries(analytics.categoryCount).map(
    ([name, value]) => ({ name, value })
  );

  // Bar chart data: completed vs pending
  const statusData = [
    { name: "Completed", count: analytics.completed },
    { name: "Pending", count: analytics.pending },
  ];

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "40px" }}>
      <h2>📊 Dashboard Analytics</h2>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
        {/* Pie chart: category distribution */}
        <div>
          <h4>Task Categories</h4>
          <PieChart width={400} height={300}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar chart: completed vs pending */}
        <div>
          <h4>Task Status</h4>
          <BarChart
            width={400}
            height={300}
            data={statusData}
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
      </div>

      {/* Summary stats */}
      <div>
        <h4>Total Tasks: {analytics.total}</h4>
        <h4>Completed: {analytics.completed}</h4>
        <h4>Pending: {analytics.pending}</h4>
      </div>
    </div>
  );
};

export default Home;
