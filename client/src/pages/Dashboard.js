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
import { API_BASE_URL } from "../api";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [cashTransactions, setCashTransactions] = useState([]);
  const [plaidTransactions, setPlaidTransactions] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarMode, setSidebarMode] = useState(
    window.innerWidth <= 768 ? "hidden" : "expanded"
  );


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      setSidebarMode((prev) => {
        if (mobile) return "hidden";
        return prev === "hidden" ? "expanded" : prev;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString).name);
    }
  }, []);


  const fetchCashTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/gettransaction`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.transactions) setCashTransactions(res.data.transactions);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchPlaidTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/api/plaid/transactions`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const tagged = res.data.map((tx) => ({
        name: tx.name,
        date: tx.date,
        amount: Math.abs(tx.amount),
        type: tx.amount < 0 ? "income" : "expense",
        source: "plaid",
        category: tx.category?.[0] || "Uncategorized",
      }));

      setPlaidTransactions(tagged);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchCashTransactions();
    fetchPlaidTransactions();
  }, [fetchCashTransactions, fetchPlaidTransactions]);

  const allTransactions = [...cashTransactions, ...plaidTransactions];

  return (
    <div className="app-layout">
      {isMobile && sidebarMode === "hidden" && (
        <button
          className="mobile-toggle-button"
          onClick={() => setSidebarMode("expanded")}
        >
          ☰
        </button>
      )}

      <Sidebar
        sidebarMode={sidebarMode}
        setSidebarMode={setSidebarMode}
        isMobile={isMobile}
      />

      <div className="dashboard-content">
        <h1>Welcome, {user}</h1>

        <BalanceCard transactions={allTransactions} />

        <div className="charts-section">
          <PieCharts transactions={allTransactions} />
          <LineChartbar transactions={allTransactions} />
        </div>

        <QuickActions fetchTransactions={fetchCashTransactions} />

        <TransactionList
          transactions={allTransactions}
          fetchTransactions={fetchCashTransactions}
          onEdit={(tx) => {
            setSelectedTransaction(tx);
            setEditModalOpen(true);
          }}
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
