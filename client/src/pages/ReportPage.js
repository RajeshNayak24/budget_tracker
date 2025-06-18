import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "../styles/ReportPage.css";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#845EC2",
  "#D65DB1",
  "#FF6F91",
  "#4B4453",
  "#2C73D2",
  "#FFC75F",
  "#F9F871",
];

const ReportsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedyear] = useState("");

  const filteredTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return (
      (!selectedMonth || month === selectedMonth) &&
      (!selectedYear || year === selectedYear)
    );
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5050/api/gettransaction",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(res.data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const categoryMap = {};
  filteredTransactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Number(t.amount);
    }
  });
  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const monthlyTotals = {};
  filteredTransactions.forEach((t) => {
    const date = new Date(t.date);
    const month = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = { income: 0, expense: 0 };
    }
    monthlyTotals[month][t.type] += Number(t.amount);
  });

  const barChartData = Object.entries(monthlyTotals).map(([month, totals]) => ({
    month,
    income: totals.income,
    expense: totals.expense,
  }));

  const handleDownloadcsv = () => {
    console.log("Filtered transactions to export:", filteredTransactions);

    if (!filteredTransactions.length) {
      alert("No transactions to download.");
      return;
    }

    const header = ["Date", "Type", "Amount", "Category", "Description"];
    const csvRows = [
      header.join(","),
      ...filteredTransactions.map((t) =>
        [
          new Date(t.date).toLocaleDateString(),
          t.type,
          t.amount,
          t.category,
          t.description || "",
        ]
        .map((val) => `"${val}"`)
        .join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "filtered_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="reports-content">
        <h1>Reports 📊</h1>

        <div className="summary">
          <div className="summary-box income">Total Income: ₹{totalIncome}</div>
          <div className="summary-box expense">
            Total Expense: ₹{totalExpense}
          </div>
        </div>
        <div className="filters">
          <select onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">All Months</option>
            {[...Array(12)].map((_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              const label = new Date(0, i).toLocaleString("default", {
                month: "long",
              });
              return (
                <option key={month} value={month}>
                  {label}
                </option>
              );
            })}
          </select>

          <select onChange={(e) => setSelectedyear(e.target.value)}>
            <option value="">All Years</option>
            {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="report-actions">
          <button onClick={handleDownloadcsv} className="download-btn">
            {" "}
            📥 Download CSV
          </button>
        </div>

        <div className="charts">
          <div className="chart-box">
            <h3>Expense by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Monthly Income & Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expense" fill="#f06292" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <h3>Income vs Expense Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#FF6F91"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
