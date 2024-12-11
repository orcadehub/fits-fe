import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../config"; // Your config for API base URL
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState([]);
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

        const response = await axios.post(`${baseURL}/user-details`, {
          userId,
        });
        setUserData(response.data);
        setCompletedDays(response.data.completedDays || []);
        console.log("Completed Days:", completedDays);
        console.log("Item Day:", userData);
        debugger
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [baseURL, navigate]);

  const handleMarkCompleted = async (day) => {
    const confirmation = window.prompt(
      `Type "COMPLETED" to mark Day ${day} as completed.`
    );
    if (confirmation === "COMPLETED") {
      try {
        debugger;
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          toast.error("User ID not found. Please log in again.");
          navigate("/login");
          return;
        }
        const userId = user._id;
        const response = await axios.post(`${baseURL}/mark-completed`, {
          userId,
          day,
        });

        if (response.data.success) {
          setCompletedDays(response.data.completedDays);
          toast.success(`Day ${day} marked as completed!`);
        } else {
          toast.error("Failed to update schedule. Please try again.");
        }
      } catch (error) {
        console.error("Error updating completion:", error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.warning("You must type 'COMPLETED' to confirm.");
    }
  };

  // Data for Bar Graph
  const graphData = {
    labels: Array.from({ length: 60 }, (_, i) => `Day ${i + 1}`), // 60 days for 2 months
    datasets: [
      {
        label: "Completion Percentage",
        data: userData
          ? userData.foodAndExercise.map((item) =>
              completedDays.includes(item.day) ? 100 : 0
            )
          : [],
        backgroundColor: "#28a745",
      },
    ],
  };
  

  const seizureRisk = Math.max(0, 100 - completedDays.length * 1.66);

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
              <th>Completed</th>
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
                <td>
                  {completedDays.includes(item.day) ? (
                    <span className="text-success">Completed</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleMarkCompleted(item.day)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Graph Section */}
        <div className="mt-5">
          <h4>Schedule Adherence Graph</h4>
          <Bar data={graphData} options={{ responsive: true }} />
        </div>

        {/* Seizure Risk Percentage */}
        <div className="mt-4 text-center">
          <h5>
            Based on your adherence, the seizure risk is estimated at{" "}
            <span className="text-danger">{seizureRisk}%</span>.
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
