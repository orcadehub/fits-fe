import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register PointElement here
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Add this line to fix the error
  Title,
  Tooltip,
  Legend
);

const Graph1 = () => {
  // Data for Seizure Frequency vs Exercise Frequency
  const seizureFrequencyData = {
    labels: [
      "Low (0-1 times/week)",
      "Moderate (2-3 times/week)",
      "High (4-5 times/week)",
    ],
    datasets: [
      {
        label: "Seizure Frequency",
        data: [7, 3, 1], // Example seizure frequency values
        backgroundColor: ["#ff6f61", "#ffcc29", "#88d498"], // Colors for bars
      },
    ],
  };

  // Data for Exercise Type vs Seizure Frequency
  const exerciseTypeData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Aerobic Exercise",
        data: [1, 2, 4],
        borderColor: "#4285F4",
        backgroundColor: "#4285F4",
        fill: false,
      },
      {
        label: "Strength Training",
        data: [1, 3, 2],
        borderColor: "#FBBC05",
        backgroundColor: "#FBBC05",
        fill: false,
      },
      {
        label: "Flexibility Exercise",
        data: [2, 2, 3],
        borderColor: "#34A853",
        backgroundColor: "#34A853",
        fill: false,
      },
      {
        label: "Mind-Body Exercise",
        data: [4, 3, 1],
        borderColor: "#EA4335",
        backgroundColor: "#EA4335",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Exercise Frequency and Seizure Relationship",
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>
        Seizure Frequency vs Exercise Frequency
      </h2>
      <Bar data={seizureFrequencyData} options={{ responsive: true }} />

      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Exercise Type vs Seizure Frequency
      </h2>
      <Line data={exerciseTypeData} options={options} />
    </div>
  );
};

export default Graph1;
