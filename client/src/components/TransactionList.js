import React from 'react'
import "../styles/TransactionList.css";

const TransactionList = ({transactions}) => {
  return (
    <div className="transactions-list">
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`transaction-item ${transaction.type}`}
          >
            <span className="transaction-description">
              {transaction.description}
            </span>
            <span className="transaction-amount">
              ${transaction.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList