import React, { useState } from "react";

function Booking() {
  // THIS LINE IS MISSING OR BROKEN - Make sure it is exactly here:
  const [formData, setFormData] = useState({ name: "", phone: "", eventDate: "", guests: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://54.234.8.36:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Uses formData from the useState above
      });
      if (response.ok) {
        const result = await response.json();
        alert("Success! " + result.message);
        // Uses setFormData from the useState above
        setFormData({ name: "", phone: "", eventDate: "", guests: "" });
      } else {
        alert("Server Error");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not reach the backend.");
    }
  };

  return (
    <div className="page">
      <h1>Book Your Event</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <input name="name" value={formData.name} placeholder="Name" onChange={handleChange} required />
        <input name="phone" value={formData.phone} placeholder="Phone" onChange={handleChange} required />
        <input name="eventDate" value={formData.eventDate} type="date" onChange={handleChange} required />
        <input name="guests" value={formData.guests} placeholder="Number of Guests" onChange={handleChange} required />
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default Booking;