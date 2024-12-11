import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
} from "chart.js";

// Register chart components
ChartJS.register(Title, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement);

// WebSocket connection
const socket = io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:3300"
    : "https://your-deployed-backend-url.com"
);

const Detection = () => {
  const [detectionHistory, setDetectionHistory] = useState([]);

  useEffect(() => {
    // Listen for updates from the server
    socket.on("detectionHistoryUpdate", (data) => {
      console.log("Received data:", data);
      setDetectionHistory(data);
    });

    // Cleanup on component unmount
    return () => socket.off("detectionHistoryUpdate");
  }, []);

  // Get the most recent detection
  const latestDetection =
    detectionHistory.length > 0 ? detectionHistory[detectionHistory.length - 1] : null;

  // Prepare chart data
  const data = {
    labels: detectionHistory.map((detection) =>
      new Date(detection.timestamp).toLocaleTimeString()
    ),
    datasets: [
      {
        label: "EEG Values",
        data: detectionHistory.map((detection) => detection.eegValue),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "EEG Value" }, beginAtZero: true },
    },
  };

  return (
    <div style={{ width: "80%", margin: "50px auto" }}>
      <h1 style={{ textAlign: "center" }}>Seizure Detection Graph</h1>

      {/* Display the latest values */}
      {latestDetection && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2>Latest Detection</h2>
          <p>
            <strong>EEG Value:</strong> {latestDetection.eegValue}
          </p>
          <p>
            <strong>Seizure Detected:</strong>{" "}
            {latestDetection.seizureDetected ? "Yes" : "No"}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(latestDetection.timestamp).toLocaleString()}
          </p>
        </div>
      )}

      {/* Line chart */}
      {detectionHistory.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p style={{ textAlign: "center" }}>Waiting for detection data...</p>
      )}
    </div>
  );
};

export default Detection;
