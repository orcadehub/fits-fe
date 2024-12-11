import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../config";

const Onboard = () => {
  const navigate = useNavigate();
  const baseURL =
    process.env.NODE_ENV === "development"
      ? config.LOCAL_BASE_URL.replace(/\/$/, "")
      : config.BASE_URL.replace(/\/$/, "");

  // List of onboarding questions
  const questions = [
    "What is your full name?",
    "What is your age?",
    "What is your gender? (Male/Female/Other)",
    "What is your height in cm?",
    "What is your weight in kg?",
    "Do you experience seizures regularly? (Yes/No)",
    "How often do you experience seizures in a month?",
    "What type of seizures do you have? (e.g., focal, generalized, unknown)",
    "Do you take any medications for seizures? (Yes/No)",
    "If yes, please list the medications.",
    "Do you follow any specific diet currently? (Yes/No)",
    "If yes, briefly describe your diet.",
    "Do you engage in physical exercise regularly? (Yes/No)",
    "What kind of exercises do you do, if any?",
    "How many hours of sleep do you get per night on average?",
    "Do you have any known food allergies?",
    "Do you consume caffeine? (Yes/No)",
    "Do you consume alcohol? (Yes/No)",
    "What triggers your seizures the most? (e.g., stress, lack of sleep)",
    "Do you experience stress or anxiety frequently? (Yes/No)",
    "How would you rate your daily water intake? (Low/Moderate/High)",
    "Do you experience fatigue or dizziness regularly? (Yes/No)",
    "What are your goals for this plan? (e.g., reduce seizures, improve fitness)",
    "Are you open to trying a specific diet and exercise plan? (Yes/No)",
    "Is there anything else we should know to help personalize your plan?",
  ];

  // States to manage questions, answers, and progress
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  // Function to handle the next question
  const handleNext = (e) => {
    e.preventDefault();

    const userInput = e.target.elements.answer.value.trim();
    if (!userInput) {
      toast.error("Please provide an answer before proceeding!");
      return;
    }

    // Save the current answer
    setAnswers((prevAnswers) => [...prevAnswers, userInput]);

    // Clear input field
    e.target.reset();

    // Move to the next question or finish
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Call the API to assign the personalized plan
      completeOnboarding([...answers, userInput]); // Include the last answer
    }
  };

  // Function to handle the API call and redirect
  const completeOnboarding = async (finalAnswers) => {
    try {
      debugger;
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        toast.error("User ID not found. Please log in again.");
        navigate("/login");
        return;
      }
      const userId = user._id;
      // Call the backend API to assign a 7-day plan
      const response = await axios.post(`${baseURL}/assign-plan`, {
        userId,
      });

      // Save onboarding data to localStorage
      localStorage.setItem("onboardingData", JSON.stringify(finalAnswers));

      toast.success("Your personalized 7-day plan has been generated!");
      console.log("Plan assigned successfully:", response.data);

      // Redirect user to the dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error assigning plan:",
        error.response?.data?.error || error.message
      );
      toast.error("Failed to generate your plan. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Onboarding Process</h2>
        <p className="lead">{questions[currentQuestion]}</p>

        {/* Form to accept answers */}
        <form onSubmit={handleNext}>
          <div className="form-group">
            <input
              type="text"
              name="answer"
              className="form-control"
              placeholder="Type your answer here"
              autoFocus
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </form>

        {/* Progress */}
        <div className="text-center mt-4">
          <small>
            Question {currentQuestion + 1} of {questions.length}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
