import React, { useState } from "react";

function Booking() {
  const [formData, setFormData] = useState({ name: "", phone: "", eventDate: "", guests: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Booking form submitted! Backend connection will come later.");
    // Later: connect to Lambda API
  };

  return (
    <div className="page">
      <h1>Book Your Event</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <input name="eventDate" type="date" onChange={handleChange} required />
        <input name="guests" placeholder="Number of Guests" onChange={handleChange} required />
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default Booking;
