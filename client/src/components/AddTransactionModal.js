import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Modal.css'; 

const AddTransactionModal = ({ isOpen, onClose, fetchTransactions }) => {
  const [formData, setFormData] = useState({
    description:'',
    type: 'income',
    amount: '',
    category: '',
    note: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:5050/api/addtransaction',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);
      fetchTransactions();  
      onClose();            
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert("Error adding transaction");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Description:
                <input type="string" name="description" value={formData.description} onChange={handleChange}/>
          </label>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label>
            Amount:
            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
          </label>
          <label>
            Note:
            <input type="text" name="note" value={formData.note} onChange={handleChange} />
          </label>
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
