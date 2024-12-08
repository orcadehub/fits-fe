import React, { useState } from "react";
import axios from "axios";
import "./Auth.css"; // Styling for Login and Signup
import config from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const baseURL =
    process.env.NODE_ENV === "development"
      ? config.LOCAL_BASE_URL.replace(/\/$/, "")
      : config.BASE_URL.replace(/\/$/, "");

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const { emailOrPhone, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrPhone || !password) {
      toast.warn("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/login`, formData);
      const { token, user } = res.data;

      // Store token and user details in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      console.log("User:", user);
      console.log("Token:", token);
      if (user.isNewUser) {
        navigate("/onboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email or Phone:</label>
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Enter your email or phone"
              value={emailOrPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
