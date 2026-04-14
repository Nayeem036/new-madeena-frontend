import React from "react";
import { useNavigate } from "react-router-dom"; // Import the navigation hook
import "./Home.css";
import ownerImg from "../assets/owner.jpg"; 
import logo from "../assets/logo.png"; 

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="home-container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="New Madeena Star Catering Logo" className="logo-img" />
      </div>

      {/* Owner Section */}
      <div className="owner-section">
        <img src={ownerImg} alt="Owner" className="owner-img" />
        <h2 className="welcome-text">Welcome to New Madeena Star Catering Service</h2>
        <p className="authentic-line">
          Serving Authentic Taste with Passion, Tradition, and Trust
        </p>
        
        {/* Updated Button to use React Router navigate */}
        <button className="order-btn" onClick={() => navigate("/booking")}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Home;