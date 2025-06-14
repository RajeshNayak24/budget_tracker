import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import "../styles/Sidebar.css";


const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="sidebar">
      <h2>Budget App 💰</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/add">Expenses </Link>
          </li>
          <li>
            <Link to="/myaccount">My Account</Link>
          </li>
          <li>
            <Link to="/report">Reports</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li className="logout-button a" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
