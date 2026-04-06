import React from "react";
import "./Home.css";
import ownerImg from "../assets/owner.jpg"; // Adjust file name if different
import logo from "../assets/logo.png"; // Your logo file

const Home = () => {
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
        <button className="order-btn" onClick={() => (window.location.href = "/booking")}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Home;
