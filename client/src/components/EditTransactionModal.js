import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Modal.css";
import { API_BASE_URL } from "../api";

const EditTransactionModal = ({ isOpen, onClose, transaction, onUpdate }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount);
    }
  }, [transaction]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/api/updatetransaction/${transaction._id}`,
        { description, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (!isOpen || !transaction) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Transaction</h3>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Amount"
        />
        <div className="modal-actions">
          <button onClick={handleUpdate}>Save</button>
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;
