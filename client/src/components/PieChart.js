import React from "react";
import { Pie, PieChart, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import "../styles/PieCharts.css"

const COLORS = ["#27ae60", "#c0392b"];

const PieCharts = ({ transactions }) => {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
    const data = [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ];

  return (
    <div className="pie-chart-container">
      <h3 className="pie-chart-title">Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(2)}%)`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}           
            animationDuration={1000}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieCharts;