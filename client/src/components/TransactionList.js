import React from "react";
import axios from "axios";
import "../styles/TransactionList.css";
import { API_BASE_URL } from "../api";

const TransactionList = ({ transactions, fetchTransactions, onEdit }) => {
  const handleDeleteTransaction = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/deletetransaction/${id}`,
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

  const formatAmount = (amt) => {
    const absAmount = Math.abs(amt.amount).toFixed(2);

    if (amt.source === "plaid") {
      return amt.amount < 0 ? `$${absAmount}` : `-$${absAmount}`;
    }
    if (amt.source !== "plaid") {
      return amt.type === "income" ? `$${absAmount}` : `-$${absAmount}`;
    }

    return `$${absAmount}`;
  };

  return (
    <div className="transactions-list">
      <h2>Recent Transactions</h2>
      <div className="transactions-scroll-container">
        <table className="transaction-table">
          <thead>
            <tr className="transaction-header">
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className={`transaction-row ${
                  tx.source === "plaid" ? "plaid-row" : "cash-row"
                }`}
              >
                <td>{tx.date?.split("T")[0]}</td>
                <td className="transaction-description">
                  {tx.name || tx.description}
                </td>
                <td>
                  {Array.isArray(tx.category)
                    ? tx.category.join(", ")
                    : tx.category}
                </td>
                <td
                  className={`transaction-amount ${
                    (tx.source === "plaid" && tx.amount < 0) ||
                    (tx.source !== "plaid" && tx.type === "income")
                      ? "income"
                      : "expense"
                  }`}
                >
                  {formatAmount(tx)}
                </td>
                <td>{tx.source === "plaid" ? "Card" : "Cash"}</td>
                {tx.source !== "plaid" ? (
                  <>
                    <td>
                      <button
                        className="transaction-edit-button"
                        onClick={() => onEdit(tx)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="transaction-delete-button"
                        onClick={() => handleDeleteTransaction(tx._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
