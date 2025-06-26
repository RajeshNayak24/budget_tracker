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

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="expenses-content">
        <h1>My Expenses</h1>
        <QuickActions fetchTransactions={allTransactions} />
        <TransactionList
          transactions={allTransactions}
          fetchTransactions={allTransactions}
          onEdit={handleEdit}
        />
        <EditTransactionModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
          onUpdate={allTransactions}
        />
      </div>
    </div>
  );
};

export default ExpensesPage;
