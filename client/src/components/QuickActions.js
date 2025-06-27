import React, { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import "../styles/QuickAction.css";
import AddExpenseModal from "./AddExpenseModal";

const QuickActions = ({ fetchTransactions }) => {
  const [showModal, setShowModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="quick-actions-buttons">
        <button className="add-income" onClick={() => setShowModal(true)}>
          Add Income
        </button>

        <button
          className="add-expense"
          onClick={() => setShowExpenseModal(true)}
        >
          Add Expense
        </button>
      </div>

      <AddTransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fetchTransactions={fetchTransactions}
      />
      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};

export default QuickActions;


