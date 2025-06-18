import React, { useState } from "react";
import "../styles/SettingsPage.css";
import UpdatePasswordForm from "../components/UpdatePasswordForm";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const navigate = useNavigate();

  const handleToggleEmail = () => {
    setEmailNotifications(!emailNotifications);
    console.log("Email Notifications:", emailNotifications);
  };

  const handleToggleSMS = () => {
    setSmsNotifications(!emailNotifications);
    console.log("Email Notifications:", emailNotifications);
  };

  return (
    <div className="settings-content">
      <div className="settings-page">
        <h1>Settings ⚙️</h1>
        <button className="close-btn"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          &times;
        </button>
      </div>

      <div className="settings-section">
        <h2>Update Profile</h2>
      </div>
      <div className="settings-section">
        <h2> Change Password</h2>
        <UpdatePasswordForm />
      </div>
      <div className="settings-section">
        <h2>Change Email</h2>
      </div>
      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <div className="toggle-item">
          <label>Email Notifications</label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleToggleEmail}
          />
        </div>
        <div className="toggle-item">
          <label>SMS Notifications</label>
          <input
            type="checkbox"
            checked={smsNotifications}
            onChange={handleToggleSMS}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
