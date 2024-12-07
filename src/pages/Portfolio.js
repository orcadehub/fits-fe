import React from "react";
import "./Portfolio.css"; // Import the CSS file for styling
import Port1 from "../assets/port1.jpeg";
import Port2 from "../assets/port2.jpeg";
import Port3 from "../assets/port3.webp";
import Port4 from "../assets/port4.webp";
const Portfolio = () => {
  const projects = [
    {
      title: "Seizure Safety Monitoring System",
      description:
        "A real-time seizure safety monitoring system with alerts for caregivers and family members.",
      link: "https://test.com",
      image: Port1,
    },
    {
      title: "Personalized Diet & Exercise Plans",
      description:
        "An AI-powered platform that provides personalized diet and exercise plans to help manage seizures.",
      link: "https://test.com",
      image: Port2,
    },
    {
      title: "Seizure Detection Handband",
      description:
        "A wearable handband that detects seizure activity in real-time and sends alerts to caregivers.",
      link: "https://test.com",
      image: Port3,
    },
    {
      title: "Seizure Prediction Algorithm",
      description:
        "An AI-based algorithm that predicts potential seizure events by analyzing user data.",
      link: "https://test.com",
      image: Port4,
    },
  ];

  return (
    <div className="portfolio-container">
      <h1 className="portfolio-heading">My Portfolio</h1>
      <div className="portfolio-intro">
        <p className="portfolio-description">
          Welcome to my portfolio! Here are some of the key projects I’ve been
          working on related to seizure safety technology and healthcare
          solutions.
        </p>
      </div>
      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img
              src={`${project.image}`} // Ensure images are placed in the images folder
              alt={project.title}
              className="project-image"
            />
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
