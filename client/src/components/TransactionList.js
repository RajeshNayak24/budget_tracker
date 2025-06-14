import React from "react";
import axios from "axios";
import "../styles/TransactionList.css";

const TransactionList = ({ transactions, fetchTransactions, onEdit }) => {
  const handleDeleteTransaction = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/deletetransaction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Transaction deleted:", response.data);
      fetchTransactions();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="transactions-list">
      <h2>Recent Transactions</h2>
      <div className="transactions-scroll-container">
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index} className={`transaction-item ${transaction.type}`}>
              <span className="transaction-description">
                {transaction.description}
              </span>
              <span className="transaction-amount">
                ${transaction.amount.toFixed(2)}
              </span>
              <button
                className="transaction-delete-button"
                onClick={() => handleDeleteTransaction(transaction._id)}
              >
                Delete
              </button>
              <button
                className="transaction-edit-button"
                onClick={() => onEdit(transaction)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionList;
