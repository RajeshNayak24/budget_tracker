import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import budgetIcon from "../assets/budget-icon.svg";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <img src={budgetIcon} alt="Budget Icon" className="homepage-icon" />
        <h1 data-testid="home-title">Welcome to the Budget Tracker</h1>
        <p className="homepage-subtext">
          Take control of your spending and savings
        </p>
        <div className="btn-group">
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup-button" onClick={() => navigate("/signup")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
