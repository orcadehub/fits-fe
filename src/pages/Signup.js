import React, { useState } from "react";
import axios from "axios";
import "./Auth.css"; // Styling for Login and Signup
import config from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const baseURL =
    process.env.NODE_ENV === "development"
      ? config.LOCAL_BASE_URL.replace(/\/$/, "")
      : config.BASE_URL.replace(/\/$/, "");

  console.log(baseURL);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    guardian1Email: "",
    guardian2Email: "",
  });

  const {
    name,
    email,
    phone,
    password,
    confirmPassword,
    guardian1Email,
    guardian2Email,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !guardian1Email ||
      !guardian2Email
    ) {
      toast.warn("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/signup`, formData);
      toast.success("Signup Successful");
      console.log("User registered:", res.data);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="auth-container1">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone"
              value={phone}
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
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Guardian 1 Email:</label>
            <input
              type="email"
              name="guardian1Email"
              placeholder="Enter Guardian 1's Email"
              value={guardian1Email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Guardian 2 Email:</label>
            <input
              type="email"
              name="guardian2Email"
              placeholder="Enter Guardian 2's Email"
              value={guardian2Email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
