import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/SignupPage.css";
import { API_BASE_URL } from "../api";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    console.log("Signup successful");
    setError("");
    setLoding(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });

      console.log("Signup Success:", response.data);
      // alert('Signup successful ');
      localStorage.setItem("token", response.data.token);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Try again.");
      }
    } finally {
      setLoding(false);
    }
  };
  return (
    <div className="signup-page-wrapper">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <button className="close-btn" onClick={() => navigate("/")}>
          &times;
        </button>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
          <div>
            <button className="signup-button" type="Submit" disabled={loading}>
              {loading ? "Signing up..." : "Create Account"}
            </button>
          </div>
          <div>
            <button className="loginbutton" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
