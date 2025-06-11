import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <nav className="navbar-container">
      <div>
        <h1>Budget Tracker </h1>
        <div>
          <button className="btn home">Home</button>
          <button className="btn dashboard">Dashboard</button>
          <button className="btn logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
