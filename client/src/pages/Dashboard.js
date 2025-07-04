import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
import QuickActions from "../components/QuickActions";
import EditTransactionModal from "../components/EditTransactionModal";
import PieCharts from "../components/PieChart";
import LineChartbar from "../components/LineChartbar";
import {API_BASE_URL} from '../api'

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [cashTransactions, setCashTransactions] = useState([]);
  const [plaidTransactions, setPlaidTransactions] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowSidebar(true); // always show on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function inferCategory(name) {
    const lowered = name.toLowerCase();
    if (lowered.includes("uber") || lowered.includes("lyft")) return "Travel";
    if (lowered.includes("mcdonald") || lowered.includes("starbucks"))
      return "Food";
    if (lowered.includes("airlines")) return "Travel";
    if (lowered.includes("sparkfun")) return "Electronics";

    if (lowered.includes("amazon") || lowered.includes("shopping"))
      return "Shopping";
    return "Uncategorized";
  }

  const fetchCashTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/gettransaction`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.transactions) {
        setCashTransactions(res.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching cash transactions:", error);
    }
  }, []);

  const fetchPlaidTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/api/plaid/transactions`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data) {
        const tagged = res.data.map((tx) => ({
          name: tx.name,
          date: tx.date,
          amount: Math.abs(tx.amount),
          type: tx.amount < 0 ? "income" : "expense",
          source: "plaid",
          category: tx.category?.[0] || inferCategory(tx.name),
        }));

        setPlaidTransactions(tagged);
      }
    } catch (error) {
      console.error("Error fetching plaid transactions:", error);
    }
  }, []);

  const allTransactions = [...cashTransactions, ...plaidTransactions];

  useEffect(() => {
    fetchCashTransactions();
    fetchPlaidTransactions();
  }, [fetchCashTransactions, fetchPlaidTransactions]);

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
      {isMobile && (
        <button
          className="mobile-toggle-button"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          ☰
        </button>
      )}

      <Sidebar
        isMobile={isMobile}
        isVisible={showSidebar}
        setIsVisible={setShowSidebar}
      />
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard, {user} 🎉</h1>
        <BalanceCard transactions={allTransactions} />
        <div className="charts-section">
          <PieCharts transactions={allTransactions} />
          <LineChartbar transactions={allTransactions} />
        </div>
        <QuickActions fetchTransactions={fetchCashTransactions} />
        <TransactionList
          transactions={allTransactions}
          fetchTransactions={fetchCashTransactions}
          onEdit={handleEdit}
        />
        <EditTransactionModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
          onUpdate={fetchCashTransactions}
        />
      </div>
    </div>
  );
};

export default Dashboard;
