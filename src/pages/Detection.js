import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import config from "../config"; // Your config for API base URL
import { useNavigate } from "react-router-dom";

// WebSocket connection
const baseURL =
  process.env.NODE_ENV === "development"
    ? config.LOCAL_BASE_URL.replace(/\/$/, "")
    : config.BASE_URL.replace(/\/$/, "");

const socket = io(`${baseURL}`);

const Detection = () => {
    const navigate=useNavigate()
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Get userId from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("User ID not found. Please log in again.");
      navigate("/login");
      return;
    }
    const userId = user._id;
    setUserId(userId);

    // Function to fetch the latest detections for the user
    const fetchDetections = () => {
      fetch(`${baseURL}/detections/${userId}`)
        .then((res) => res.json())
        .then((data) => setDetectionHistory(data))
        .catch((err) => console.error("Error fetching data:", err));
    };

    // Fetch data initially
    fetchDetections();

    // Fetch data every 500 milliseconds
    const interval = setInterval(() => {
      fetchDetections();
    }, 500); // Adjust the interval time here (e.g., 500ms)

    // Join the WebSocket room for the user
    socket.emit("joinUserRoom", userId);

    // Listen for new detections via WebSocket
    socket.on("newDetectionUpdate", (data) => {
      setDetectionHistory((prev) => [data, ...prev.slice(0, 99)]); // Keep the latest 100 records
    });

    // Cleanup
    return () => {
      clearInterval(interval); // Stop the interval when component unmounts
      socket.off("newDetectionUpdate");
    };
  }, []);

  // Prepare chart data
  const data = {
    labels: detectionHistory
      .slice()
      .reverse()
      .map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "EEG Values",
        data: detectionHistory.map((d) => d.eegValue).reverse(),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: "80%", margin: "50px auto" }}>
      <h1>Seizure Detection Graph</h1>
      <Line data={data} />
      <h2>Recent Values</h2>
      {detectionHistory.slice(0, 5).map((item, index) => (
        <p key={index}>
          EEG: {item.eegValue} | Seizure: {item.seizureDetected ? "Yes" : "No"}{" "}
          | {new Date(item.timestamp).toLocaleTimeString()}
        </p>
      ))}
    </div>
  );
};

export default Detection;
