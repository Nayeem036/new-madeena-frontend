const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to the MongoDB Container
// Since we will use --network="host", we use localhost
mongoose.connect('mongodb://localhost:27017/catering')
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2. Create the Booking Schema
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    eventDate: { type: String, required: true },
    guests: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// 3. API Route to save data
app.post('/api/booking', async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Booking successfully saved to Database!" });
    } catch (error) {
        console.error("Save error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 4. API Route to fetch all bookings for the Admin Dashboard
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const allBookings = await Booking.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(allBookings);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Could not retrieve bookings" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});