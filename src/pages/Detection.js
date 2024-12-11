import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3300"); // Backend server URL

const Detection = () => {
  const [detectionData, setDetectionData] = useState(null);

  useEffect(() => {
    socket.on("detectionUpdate", (data) => {
      console.log("Received data:", data);
      setDetectionData(data);
    });

    return () => socket.off("detectionUpdate");
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Seizure Detection</h1>
      {detectionData ? (
        <div style={styles.card}>
          <p style={styles.dataLine}>
            <span style={styles.label}>EEG Value:</span> {detectionData.eegValue}
          </p>
          <p style={styles.dataLine}>
            <span style={styles.label}>Seizure Detected:</span>{" "}
            {detectionData.seizureDetected ? (
              <span style={styles.seizureYes}>Yes</span>
            ) : (
              <span style={styles.seizureNo}>No</span>
            )}
          </p>
          <p style={styles.dataLine}>
            <span style={styles.label}>Timestamp:</span>{" "}
            {new Date(detectionData.timestamp).toLocaleString()}
          </p>
        </div>
      ) : (
        <p style={styles.waitingText}>Waiting for data...</p>
      )}
    </div>
  );
};

// Inline Styles Object
const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
  },
  card: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  dataLine: {
    fontSize: "16px",
    margin: "10px 0",
    color: "#555",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  seizureYes: {
    color: "#d9534f", // Red color for "Yes"
    fontWeight: "bold",
  },
  seizureNo: {
    color: "#5cb85c", // Green color for "No"
    fontWeight: "bold",
  },
  waitingText: {
    fontSize: "18px",
    color: "#777",
  },
};

export default Detection;
