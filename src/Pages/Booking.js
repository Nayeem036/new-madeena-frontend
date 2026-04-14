const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Connect to your AWS Public IP on Port 5000
      const response = await fetch('http://13.221.125.85:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sends name, phone, eventDate, and guests
      });

      if (response.ok) {
        const result = await response.json();
        alert("Success! " + result.message);
        // Optional: Clear form after success
        setFormData({ name: "", phone: "", eventDate: "", guests: "" });
      } else {
        const errorData = await response.json();
        alert("Server Error: " + (errorData.error || "Failed to submit"));
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not reach the backend. Please check if Port 5000 is open in AWS Security Groups.");
    }
  };