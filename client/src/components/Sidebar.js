import React from "react";
import { Link } from "react-router-dom";
import '../styles/Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Budget App 💰</h2>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/add">Add Transaction </Link>
          </li>
          <li>
            <Link to="/report">Reports</Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
