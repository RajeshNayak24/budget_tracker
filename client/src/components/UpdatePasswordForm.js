import React, { useState } from "react";
import axios from "axios";
import "../styles/UpdatePasswordForm.css";

const UpdatePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5050/api/updatepassword",
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccessMsg("Password changed successfully ✅");
        setNewPassword("");
        setShowForm(false);
    
      }
    } catch (error) {
      console.error(
        "Error updating password:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="update-password-container">
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="change-button">
          Change Password
        </button>
      )}

      {showForm && (
        <form className="password-form" onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <div className="form-buttons">
          <button type="submit">Update Password</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setShowForm(false)}
            >
            Cancel
          </button>
          </div>
        </form>
      )}

      {successMsg && <p className="success">{successMsg}</p>}
    </div>
  );
};

export default UpdatePasswordForm;
