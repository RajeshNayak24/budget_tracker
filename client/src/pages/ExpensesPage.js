import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import TransactionList from "../components/TransactionList";
import QuickActions from "../components/QuickActions";
import EditTransactionModal from "../components/EditTransactionModal";
import axios from "axios";
import "../styles/ExpensesPages.css";

const ExpensesPage = () => {
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
    if (lowered.includes("sparkfun")) return "enter";

    if (lowered.includes("amazon") || lowered.includes("shopping"))
      return "Shopping";
    return "Uncategorized";
  }

  const fetchCashTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5050/api/gettransaction", {
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
        "http://localhost:5050/api/plaid/transactions",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data) {
        const tagged = res.data.map((tx) => ({
          name: tx.name,
          date: tx.date,
          amount: tx.amount,
          type: tx.amount < 0 ? "expense" : "income",
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
      <main className="expenses-content">
        <h1 className="expenses-title">💸 My Expenses</h1>

        <section className="expenses-actions">
          <QuickActions fetchTransactions={allTransactions} />
        </section>

        <section className="expenses-list">
          <TransactionList
            transactions={allTransactions}
            fetchTransactions={allTransactions}
            onEdit={handleEdit}
          />
        </section>

        <EditTransactionModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
          onUpdate={allTransactions}
        />
      </main>
    </div>
  );
};

export default ExpensesPage;
