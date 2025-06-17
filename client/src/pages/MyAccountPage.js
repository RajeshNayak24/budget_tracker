import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/MyAccountPage.css";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

const MyAccountPage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  // const [newPassword, setNewPassword] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");
  // const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchuser = localStorage.getItem("user");
    if (fetchuser) {
      const fetcheduser = JSON.parse(fetchuser);
      setUser({ name: fetcheduser.name, email: fetcheduser.email });
    }
  }, []);

  // const handlePasswordChange = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.put(
  //       "http://localhost:5050/api/updatepassword",
  //       { password: newPassword },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (response.data.success) {
  //       setSuccessMsg("Password changed successfully ✅");
  //       setNewPassword("");
  //       setShowForm(false);
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error updating password:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="account-content">
        <h1>My Account</h1>
        <div className="account-info">
          <h2>Account Information</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        {/* {!showForm && (
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
            <button type="submit">Update Password</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        )}
        {successMsg && <p className="success">{successMsg}</p>} */}
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default MyAccountPage;
