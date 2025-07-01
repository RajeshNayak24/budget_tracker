import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../styles/LoginPage.css";
import { API_BASE_URL } from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoding] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setError("");
    setLoding(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
      });
      console.log("Backend Response:", response.data);
      // alert('Login success')
      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        setError("Unexpected response from server");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2>Welcome Back 👋</h2>
        <button className="close-btn" onClick={() => navigate("/")}>
          &times;
        </button>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error && e.target.value && password) setError("");
              }}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error && e.target.value && email) setError("");
              }}
              required
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            className="signup-button"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
