import React from "react";
import "./Header.css"; // Import the CSS for styling
import Seizure from "../assets/brand.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  // Check if user exists in localStorage
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    // Clear user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.warn("Logged out from account")
    navigate("/login");
  };

  return (
    <header className="header">
      {/* Left Side: Brand Logo and Name */}
      <div className="header-left">
        <img
          src={Seizure} // Replace with your logo URL
          alt="Brand Logo"
          className="logo"
        />
        {/* <h1 className="brand-name">Seizure Safety</h1> */}
      </div>

      {/* Right Side: Menu */}
      <nav className="header-right">
        <ul className="menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {/* Conditionally Render Login or Dashboard */}
          {user ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
