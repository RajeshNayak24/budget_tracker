import React from 'react'
import '../styles/BalanceCard.css'

const BalanceCard = ({balance,income,expense}) => {
  return (
    <div className="balance-card">
      <div className="balance">
        Total Balance: <strong>${balance.toFixed(2)} </strong>{" "}
      </div>
      <div className="income">Income: +${income.toFixed(2)}</div>
      <div className="expense">Expense: -${expense.toFixed(2)}</div>
    </div>
  );
}

export default BalanceCard