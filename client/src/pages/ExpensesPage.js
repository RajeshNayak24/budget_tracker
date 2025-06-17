import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TransactionList from "../components/TransactionList";
import QuickActions from "../components/QuickActions";
import EditTransactionModal from "../components/EditTransactionModal";
import axios from "axios";
import "../styles/ExpensesPages.css";

const ExpensesPage = () => {
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
      if (res.data.transactions) {
        setTransactions(res.data.transactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="expenses-content">
        <h1>My Expenses</h1>
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

export default ExpensesPage;
