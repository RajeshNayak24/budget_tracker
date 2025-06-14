import React, { useRef, useEffect, useState } from "react";
import "../styles/BalanceCard.css";

const BalanceCard = ({ transactions }) => {
  const [balanceChange, setBalanceChange] = useState(0);
  const previousBalanceRef = useRef(0);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  useEffect(() => {
    const prev = previousBalanceRef.current;
    setBalanceChange(balance - prev);
    previousBalanceRef.current = balance;
  }, [balance]);

  const getChangeText = () => {
    if (balanceChange > 0) return `↑ $${balanceChange.toFixed(2)}`;
    if (balanceChange < 0) return `↓ $${Math.abs(balanceChange).toFixed(2)}`;
    return "No change";
  };

  return (
    <div className="balance-card">
      <div className="balance-section">
        <h3>Total Balance</h3>
        <p>${balance.toFixed(2)}</p>
        <span
          className={`balance-change ${
            balanceChange > 0
              ? "positive"
              : balanceChange < 0
              ? "negative"
              : ""
          }`}
        >
          {getChangeText()}
        </span>
      </div>

      <div className="income-expense-section">
        <div className="income">
          <h4>Income</h4>
          <p className="income-amount">${income.toFixed(2)}</p>
        </div>
        <div className="expense">
          <h4>Expense</h4>
          <p className="expense-amount">${expense.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
