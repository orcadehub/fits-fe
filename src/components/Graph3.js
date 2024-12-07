import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph3 = () => {
  // Data for Exercise Types and Seizure Frequency
  const exerciseTypesData = {
    labels: ["Aerobic Exercise", "Strength Training", "Flexibility Exercise", "Mind-Body Exercise"],
    datasets: [
      {
        label: "Exercise Type vs Seizure Frequency",
        data: [40, 30, 15, 15], // Percentage for each exercise type
        backgroundColor: ["#FF5733", "#4285F4", "#34A853", "#FBBC05"],
        borderColor: "#fff",
        borderWidth: 1,
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
        text: "Exercise Types and Seizure Frequency",
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Exercise Types and Seizure Frequency</h2>
      <Pie data={exerciseTypesData} options={options} />
    </div>
  );
};

export default Graph3;
