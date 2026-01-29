import React from "react";
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
import budgetLogo from "../assets/budget-titleimg.png";

const Sidebar = ({ sidebarMode, setSidebarMode, isMobile }) => {
  const navigate = useNavigate();
  const showText = sidebarMode === "expanded";

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarMode("hidden");
    } else {
      setSidebarMode((prev) =>
        prev === "collapsed" ? "expanded" : "collapsed",
      );
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className={`sidebar sidebar--${sidebarMode}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isMobile ? "✖" : sidebarMode === "collapsed" ? "☰" : "✖"}
      </button>

      {showText ? (
        <div className="title">
          <img src={budgetLogo} alt="budget logo" className="budget-icon" />
          <h2 className="sidebar-title">Budget Tracker</h2>
        </div>
      ) : (
        <h2 className="sidebar-title">
          <img src={budgetLogo} alt="budget logo" className="budget-icon" />
        </h2>
      )}
      <nav>
        <ul className="sidebaritems">
          <SidebarItem
            to="/dashboard"
            icon={<FaTachometerAlt />}
            label="Dashboard"
            showText={showText}
          />
          <SidebarItem
            to="/link-bank"
            icon={<FaCreditCard />}
            label="Link Bank"
            showText={showText}
          />
          <SidebarItem
            to="/expenses"
            icon={<FaMoneyBillWave />}
            label="Expenses"
            showText={showText}
          />
          <SidebarItem
            to="/myaccount"
            icon={<FaUserCircle />}
            label="My Account"
            showText={showText}
          />
          <SidebarItem
            to="/report"
            icon={<FaChartPie />}
            label="Reports"
            showText={showText}
          />
          <SidebarItem
            to="/settings"
            icon={<FaCog />}
            label="Settings"
            showText={showText}
          />

          <li className="logout-button" onClick={logout}>
            <FaSignOutAlt className="sidebar-icon" />
            {showText && "Logout"}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label, showText }) => (
  <li className="sidebarItems">
    <Link to={to}>
      <span className="sidebar-icon">{icon}</span>
      {showText && label}
    </Link>
  </li>
);

export default Sidebar;
