import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaUserCircle,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {collapsed ? "☰" : "✖"}
      </button>
      {!collapsed && <h2>Budget App 💰</h2>}
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaTachometerAlt className="sidebar-icon" />
              {!collapsed && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to="/expenses">
              <FaMoneyBillWave className="sidebar-icon" />
              {!collapsed && "Expenses"}
            </Link>
          </li>
          <li>
            <Link to="/myaccount">
              <FaUserCircle className="sidebar-icon" />
              {!collapsed && "My Account"}
            </Link>
          </li>
          <li>
            <Link to="/report">
              <FaChartPie className="sidebar-icon" />
              {!collapsed && "Reports"}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog className="sidebar-icon" />
              {!collapsed && "Settings"}
            </Link>
          </li>
          <li className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" />
            {!collapsed && "Logout"}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
