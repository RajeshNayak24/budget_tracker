import React, { useState } from "react";
import AddTransactionModal from "./AddTransactionModal";
import "../styles/QuickAction.css";

const QuickActions = ({ fetchTransactions }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="quick-actions-buttons">
        <button className="add-income" onClick={() => setShowModal(true)}>
          Add Income
        </button>

        <button className="add-expense" onClick={() => setShowModal(true)}>
          Add Expense
        </button>
      </div>

      <AddTransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fetchTransactions={fetchTransactions}
      />
    </div>
  );
};

export default QuickActions;
