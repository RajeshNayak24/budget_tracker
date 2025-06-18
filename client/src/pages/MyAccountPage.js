import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/MyAccountPage.css";
import UpdatePasswordForm from "../components/UpdatePasswordForm";

const MyAccountPage = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchuser = localStorage.getItem("user");
    if (fetchuser) {
      const fetcheduser = JSON.parse(fetchuser);
      setUser({ name: fetcheduser.name, email: fetcheduser.email });
    }
  }, []);

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
        <UpdatePasswordForm />
      </div>
    </div>
  );
};

export default MyAccountPage;
