import React, { useState } from "react";

function Booking() {
  // 1. Initialized formData state with the newly integrated address key
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    eventDate: "", 
    guests: "",
    address: "" // 👈 Added address field tracking
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://54.234.8.36:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        const result = await response.json();
        // Displays your clean, singular attractive backend alert text smoothly
        alert(result.message);
        
        // Clear all fields completely upon successful resolution
        setFormData({ name: "", phone: "", eventDate: "", guests: "", address: "" });
      } else {
        alert("Server Error");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not reach the backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.glassCard}>
        <h1 style={styles.title}>✨ Book Your Event</h1>
        <p style={styles.subtitle}>Secure your dates with Madeena Catering effortlessly</p>
        
        <form onSubmit={handleSubmit} style={styles.formStructure}>
          <div style={styles.inputWrapper}>
            <input 
              name="name" 
              value={formData.name} 
              placeholder="Full Name" 
              onChange={handleChange} 
              style={styles.modernInput} 
              required 
            />
          </div>

          <div style={styles.inputWrapper}>
            <input 
              name="phone" 
              value={formData.phone} 
              placeholder="Phone Number" 
              onChange={handleChange} 
              style={styles.modernInput} 
              required 
            />
          </div>

          <div style={styles.inputWrapper}>
            <input 
              name="eventDate" 
              value={formData.eventDate} 
              type="date" 
              onChange={handleChange} 
              style={styles.modernInput} 
              required 
            />
          </div>

          <div style={styles.inputWrapper}>
            <input 
              name="guests" 
              value={formData.guests} 
              placeholder="Estimated Guest Count" 
              onChange={handleChange} 
              style={styles.modernInput} 
              required 
            />
          </div>

          {/* 2. Added New Address Field Input Wrapper */}
          <div style={styles.inputWrapper}>
            <input 
              name="address" 
              value={formData.address} 
              placeholder="Event Delivery Address" 
              onChange={handleChange} 
              style={styles.modernInput} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            style={isSubmitting ? { ...styles.submitBtn, ...styles.btnDisabled } : styles.submitBtn}
          >
            {isSubmitting ? "Processing Reservation..." : "Submit Booking 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Advanced 2026 UI Design System CSS-in-JS Tokens
const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
    padding: "20px"
  },
  glassCard: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    textAlign: "center"
  },
  title: {
    color: "#2C3E50",
    fontSize: "30px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    letterSpacing: "-0.5px"
  },
  subtitle: {
    color: "#7F8C8D",
    fontSize: "14px",
    margin: "0 0 30px 0"
  },
  formStructure: {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  inputWrapper: {
    width: "100%"
  },
  modernInput: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "8px",
    border: "1px solid #DCE4EC",
    backgroundColor: "#FFFFFF",
    fontSize: "15px",
    color: "#34495E",
    transition: "all 0.2s ease-in-out",
    boxSizing: "border-box",
    outline: "none"
  },
  submitBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2ECC71",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(46, 204, 113, 0.2)"
  },
  btnDisabled: {
    backgroundColor: "#95A5A6",
    cursor: "not-allowed",
    boxShadow: "none"
  }
};

export default Booking;