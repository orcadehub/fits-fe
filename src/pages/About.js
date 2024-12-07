import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for layout and styling
import './About.css';


const About = () => {
  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">About Seizure Safety</h2>

        <p>
          <strong>Seizure Safety</strong> is a revolutionary platform designed to
          help individuals living with epilepsy and other seizure disorders lead a
          healthier and more manageable life. Our goal is to provide personalized
          health and fitness plans, along with crucial lifestyle guidance to support
          people who experience seizures.
        </p>

        <h4>Our Vision</h4>
        <p>
          At Seizure Safety, we aim to create a world where individuals with seizure
          disorders can feel empowered and secure in managing their condition. By
          providing personalized diet, exercise, and wellness plans tailored to each
          person's unique needs, we ensure they lead a balanced life and stay safe.
        </p>

        <h4>How It Works</h4>
        <p>
          The process begins with a comprehensive onboarding questionnaire to gather
          essential information about the user's health, seizure patterns, diet,
          exercise habits, and other lifestyle factors. This helps us craft a
          customized 7-day plan consisting of a balanced diet and exercises designed
          to improve physical health and reduce seizure triggers.
        </p>

        <h4>Features</h4>
        <ul>
          <li>
            <strong>Personalized Diet Plans:</strong> Meal plans designed to ensure
            proper nutrition while taking seizure triggers into account.
          </li>
          <li>
            <strong>Exercise Plans:</strong> A combination of physical activities,
            including low-impact exercises that help improve fitness without
            triggering seizures.
          </li>
          <li>
            <strong>Seizure Management Tools:</strong> Monitor your seizure patterns
            and triggers to adjust the plan as needed.
          </li>
          <li>
            <strong>Progress Tracking:</strong> Regular tracking of progress on the
            dashboard, including improvements in fitness and seizure management.
          </li>
        </ul>

        <h4>Why Seizure Safety?</h4>
        <p>
          Seizure Safety isn’t just another health app. It's a comprehensive system
          built to assist individuals who experience seizures in a meaningful way. We
          provide not just a plan, but also the support needed to navigate daily life
          safely and confidently. Our team is committed to making sure every user gets
          the attention and care they deserve.
        </p>

        <h4>Join Us on Our Mission</h4>
        <p>
          If you're ready to take control of your health and start your journey towards
          a safer, healthier life, <strong>Seizure Safety</strong> is here to help. Our
          team is dedicated to making a positive impact and creating a community for
          those who live with seizures. Join us, and let’s work together towards
          better seizure management and overall health.
        </p>

        <div className="text-center mt-4">
          <a href="/signup" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
