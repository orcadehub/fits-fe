import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config"; // Your config for API base URL
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for styling
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const baseURL =
    process.env.NODE_ENV === "development"
      ? config.LOCAL_BASE_URL.replace(/\/$/, "")
      : config.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          toast.error("User ID not found. Please log in again.");
          navigate("/login");
          return;
        }
        const userId = user._id;
        debugger;
        const response = await axios.post(`${baseURL}/user-details`, {
          userId,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [baseURL]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card p-4">
        {/* User Info Section */}
        <h2 className="text-center mb-4">Dashboard</h2>
        <div className="user-details mb-4">
          <h4>User Details</h4>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
        </div>

        {/* Food and Exercise Plan Table */}
        <h4 className="mt-4 mb-3">Your 7-Day Food and Exercise Plan</h4>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
              <th>Morning Exercise</th>
              <th>Evening Exercise</th>
            </tr>
          </thead>
          <tbody>
            {userData.foodAndExercise.map((item, index) => (
              <tr key={index}>
                <td>{item.day}</td>
                <td>{item.breakfast}</td>
                <td>{item.lunch}</td>
                <td>{item.dinner}</td>
                <td>{item.morningExercise}</td>
                <td>{item.eveningExercise}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
