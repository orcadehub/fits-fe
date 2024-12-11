import React from "react";
import "./Service.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const Service = () => {
  const navigate=useNavigate()
  const services = [
    {
      title: "Seizure Safety Monitoring",
      description:
        "We provide 24/7 seizure monitoring services with real-time alerts for caregivers and family members to ensure timely intervention during a seizure.",
      icon: "📡",
    },
    {
      title: "Personalized Diet and Exercise Plans",
      description:
        "Our platform generates personalized diet and exercise plans based on individual needs and seizure history, aiming to reduce seizure frequency.",
      icon: "🍎",
    },
    {
      title: "Seizure Detection Capband",
      description:
        "Our wearable Cap  is equipped with advanced sensors that detect seizure activity in real-time. The device alerts caregivers or family members through the app, ensuring immediate assistance.",
      icon: "🧢",
    },
    {
      title: "Seizure Detection Devices",
      description:
        "We offer other wearable devices that can detect seizures and alert caregivers or family members immediately. These devices are lightweight and comfortable.",
      icon: "🎧",
    },
    {
      title: "Emergency Response Support",
      description:
        "In case of a seizure, our emergency response system is linked with local hospitals and paramedics to ensure prompt medical attention.",
      icon: "🚑",
    },
    {
      title: "Educational Resources",
      description:
        "We provide comprehensive educational materials to help families and caregivers understand seizures, how to manage them, and how to prevent triggers.",
      icon: "📚",
    },
    {
      title: "Seizure Prediction Algorithms",
      description:
        "Our AI-powered algorithms analyze patterns and predict potential seizure events, allowing individuals to take precautions and avoid high-risk situations.",
      icon: "🤖",
    },
  ];

  const handleClick=()=>{
    navigate('/detection')
  }

  return (
    <div className="services-container">
      <h1 className="services-heading">Seizure Safety Services</h1>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-card" onClick={handleClick}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
