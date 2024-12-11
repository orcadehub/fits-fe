import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Line } from "react-chartjs-2";
import config from "../config"; // Your config for API base URL
// WebSocket connection
const baseURL =
process.env.NODE_ENV === "development"
  ? config.LOCAL_BASE_URL.replace(/\/$/, "")
  : config.BASE_URL.replace(/\/$/, "");

const socket = io(`${baseURL}`);

const Detection = () => {
  const [detectionHistory, setDetectionHistory] = useState([]);

  useEffect(() => {
    // Fetch initial detections
    fetch(`${baseURL}/detections`)
      .then((res) => res.json())
      .then((data) => setDetectionHistory(data))
      .catch((err) => console.error("Error fetching data:", err));

    // Listen for new detections
    socket.on("newDetectionUpdate", (data) => {
      setDetectionHistory((prev) => [data, ...prev.slice(0, 99)]); // Keep the latest 100 records
    });

    return () => socket.off("newDetectionUpdate");
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
          EEG: {item.eegValue} | Seizure: {item.seizureDetected ? "Yes" : "No"} |{" "}
          {new Date(item.timestamp).toLocaleTimeString()}
        </p>
      ))}
    </div>
  );
};

export default Detection;
