import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const Graph2 = () => {
  // Data for Seizure Frequency Over Time
  const seizureOverTimeData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Seizure Frequency",
        data: [5, 4, 3, 2], // Seizure frequency values over weeks
        borderColor: "#FF5733",
        backgroundColor: "#FF5733",
        fill: false,
        tension: 0.1,
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
        text: "Seizure Frequency Over Time",
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Seizure Frequency Over Time</h2>
      <Line data={seizureOverTimeData} options={options} />
    </div>
  );
};

export default Graph2;
