import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
import QuickActions from "../components/QuickActions";
import EditTransactionModal from "../components/EditTransactionModal";
import PieCharts from "../components/PieChart";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5050/api/gettransaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data && res.data.transactions) {
        setTransactions(res.data.transactions);
      } else {
        console.log("No transactions found in response.");
      }
    } catch (error) {
      console.error(
        "Error fetching transactions:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userObj = JSON.parse(userString);
      setUser(userObj.name);
    }
  }, []);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard, {user} 🎉</h1>
        <BalanceCard transactions={transactions} />
        <PieCharts transactions={transactions} />
        <QuickActions fetchTransactions={fetchTransactions} />
        <TransactionList
          transactions={transactions}
          fetchTransactions={fetchTransactions}
          onEdit={handleEdit}
        />
        <EditTransactionModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
          onUpdate={fetchTransactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
