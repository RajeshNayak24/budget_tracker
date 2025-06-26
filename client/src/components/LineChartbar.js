import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "../styles/LineChartbar.css";

const LineChartbar = ({ transactions }) => {
  const groupedData = {};

  transactions.forEach((tx) => {
    const date = tx.date?.split("T")[0];
    if (!groupedData[date]) {
      groupedData[date] = { date, income: 0, expense: 0 };
    }
    if (tx.type === "income") {
      groupedData[date].income += tx.amount;
    } else if (tx.type === "expense") {
      groupedData[date].expense += tx.amount;
    }
  });

  const chartData = Object.values(groupedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="line-chart-container">
      <h3 className="line-chart-title">Income & Expense Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#27ae60"
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#c0392b"
            name="Expense"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartbar;
