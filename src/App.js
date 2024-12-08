import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify CSS
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css"; // For global styles
import Home from "./pages/Home";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Onboard from "./pages/Onboard";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Service from "./pages/Service";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <Router>
      <MainApp />
      {/* Toast Container to show notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation();

  // List of routes where the Header shouldn't be displayed
  const hideHeaderRoutes = ["/onboard"];

  return (
    <>
      {/* Conditionally render the Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
