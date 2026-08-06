import React, { useState } from "react";
import Swal from "sweetalert2";

function Booking() {
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    eventDate: "", 
    guests: "",
    address: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://98.88.26.45:5000/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        Swal.fire({
          title: "Reservation Received",
          text: "Your catering order has been submitted successfully!",
          icon: "success",
          confirmButtonColor: "#F59E0B"
        });
        setFormData({ name: "", phone: "", eventDate: "", guests: "", address: "" });
      } else {
        Swal.fire({ title: "Error", text: "Server issue. Please try again.", icon: "error" });
      }
    } catch (err) {
      Swal.fire({ title: "Connection Error", text: "Unable to reach backend.", icon: "warning" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={bookingStyles.pageWrapper}>
      <div style={bookingStyles.glassCard}>
        <div style={bookingStyles.headerArea}>
          <span style={bookingStyles.badge}>Online Reservation</span>
          <h1 style={bookingStyles.title}>Book Your Catering</h1>
          <p style={bookingStyles.subtitle}>Select your date & details for an authentic culinary experience</p>
        </div>

        <form onSubmit={handleSubmit} style={bookingStyles.form}>
          <div style={bookingStyles.inputGroup}>
            <label style={bookingStyles.label}>Full Name</label>
            <input 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. John Doe" 
              style={bookingStyles.input} 
              required 
            />
          </div>

          <div style={bookingStyles.inputGroup}>
            <label style={bookingStyles.label}>Phone Number</label>
            <input 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="+91 98765 43210" 
              style={bookingStyles.input} 
              required 
            />
          </div>

          <div style={bookingStyles.gridTwo}>
            <div style={bookingStyles.inputGroup}>
              <label style={bookingStyles.label}>Event Date</label>
              <input 
                type="date" 
                name="eventDate" 
                value={formData.eventDate} 
                onChange={handleChange} 
                style={bookingStyles.input} 
                required 
              />
            </div>
            <div style={bookingStyles.inputGroup}>
              <label style={bookingStyles.label}>Guest Count</label>
              <input 
                type="number" 
                name="guests" 
                value={formData.guests} 
                onChange={handleChange} 
                placeholder="e.g. 250" 
                style={bookingStyles.input} 
                required 
              />
            </div>
          </div>

          <div style={bookingStyles.inputGroup}>
            <label style={bookingStyles.label}>Delivery Address</label>
            <textarea 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              placeholder="Full venue address..." 
              style={{ ...bookingStyles.input, height: "90px", resize: "none" }} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            style={isSubmitting ? { ...bookingStyles.btn, opacity: 0.6 } : bookingStyles.btn}
          >
            {isSubmitting ? "Processing..." : "Confirm Booking ✨"}
          </button>
        </form>
      </div>
    </div>
  );
}

const bookingStyles = {
  pageWrapper: {
    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    background: "radial-gradient(circle at top, #1E293B 0%, #0F172A 100%)"
  },
  glassCard: {
    width: "100%",
    maxWidth: "540px",
    backgroundColor: "rgba(30, 41, 59, 0.7)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "40px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
  },
  headerArea: {
    textAlign: "center",
    marginBottom: "32px"
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    color: "#F59E0B",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: "12px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: "8px"
  },
  subtitle: {
    fontSize: "14px",
    color: "#94A3B8"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  gridTwo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#CBD5E1"
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#FFFFFF",
    fontSize: "14px",
    outline: "none"
  },
  btn: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#F59E0B",
    color: "#0F172A",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 8px 20px rgba(245, 158, 11, 0.25)"
  }
};

export default Booking;