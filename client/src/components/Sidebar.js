import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaUserCircle,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaCreditCard,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ isMobile, isVisible, setIsVisible }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsVisible(false);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div
      className={`sidebar ${
        isMobile
          ? isVisible
            ? "visible-on-mobile"
            : "hidden-on-mobile"
          : collapsed
          ? "collapsed"
          : ""
      }`}
    >
      <button className="toggle-button" onClick={toggleSidebar}>
        {isMobile ? "✖" : collapsed ? "☰" : "✖"}
      </button>
      {!collapsed && (!isMobile || isVisible) && <h2>Budget App 💰</h2>}
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <FaTachometerAlt className="sidebar-icon" />
              {!collapsed && (!isMobile || isVisible) && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to="/link-bank">
              <FaCreditCard className="sidebar-icon" />
              {!collapsed && (!isMobile || isVisible) && "LinkBank"}
            </Link>
          </li>
          <li>
            <Link to="/expenses">
              <FaMoneyBillWave className="sidebar-icon" />
              {!collapsed && (!isMobile || isVisible) && "Expenses"}
            </Link>
          </li>
          <li>
            <Link to="/myaccount">
              <FaUserCircle className="sidebar-icon" />
              {!collapsed && (!isMobile || isVisible) && "My Account"}
            </Link>
          </li>
          <li>
            <Link to="/report">
              <FaChartPie className="sidebar-icon" />
              {!collapsed && (!isMobile || isVisible) && "Reports"}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog className="sidebar-icon" />
              {!collapsed && (!isMobile || isVisible) && "Settings"}
            </Link>
          </li>
          <li className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" />
            {!collapsed && (!isMobile || isVisible) && "Logout"}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
