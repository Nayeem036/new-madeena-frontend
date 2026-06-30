const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Explicitly handle and respond to CORS OPTIONS preflight requests
app.options('*', cors()); 

// Support JSON-encoded bodies
app.use(express.json());

// 1. Connect to the MongoDB Container
mongoose.connect('mongodb://localhost:27017/catering')
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2. Updated Booking Schema (Made address optional to prevent crashes)
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    eventDate: { type: String, required: true },
    guests: { type: String, required: true },
    address: { type: String, required: false, default: "Not Provided" }, // 👈 Made optional with a fallback default
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

// 3. API Route to save data
app.post('/api/booking', async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const newBooking = new Booking(req.body);
        await newBooking.save();
        
        res.status(201).json({ 
            message: "🎉 Success! Your catering order has been successfully booked. We look forward to serving you!" 
        });
    } catch (error) {
        console.error("Save error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 4. API Route to fetch all bookings for the Admin Dashboard (JSON)
app.get('/api/admin/bookings', async (req, res) => {
    try {
        const allBookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json(allBookings);
    } catch (error) {
        console.error("Fetch error:", error);
        res.status(500).json({ error: "Could not retrieve bookings" });
    }
});

// 5. NEW: API Endpoint to Delete a specific booking
app.delete('/api/admin/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: "Booking successfully removed." });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Could not delete booking entry" });
    }
});

// 6. NEW: API Endpoint to Download Ledger Data as CSV Spreadsheet
app.get('/admin/ledger/download', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        
        // Define CSV column labels
        let csvContent = "Customer Name,Phone Number,Event Date,Guests,Event Delivery Address,Status\n";
        
        bookings.forEach(b => {
            // Escape values to prevent breaks if addresses contain commas
            const name = `"${(b.name || '').replace(/"/g, '""')}"`;
            const phone = `"${(b.phone || '').replace(/"/g, '""')}"`;
            const date = `"${(b.eventDate || '').replace(/"/g, '""')}"`;
            const guests = `"${(b.guests || '').replace(/"/g, '""')}"`;
            const address = `"${(b.address || '').replace(/"/g, '""')}"`;
            
            csvContent += `${name},${phone},${date},${guests},${address},Confirmed\n`;
        });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=madeena_catering_bookings.csv');
        res.status(200).send(csvContent);
    } catch (error) {
        console.error("CSV generation error:", error);
        res.status(500).send("Error compiling downloable ledger document");
    }
});

// 7. LIVE ADMIN LEDGER ROUTE (HTML View with Address, Delete and Download hooks)
app.get('/admin/ledger', async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }); 
        
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Madeena Catering Live Ledger</title>
            <style>
                body { font-family: "Segoe UI", sans-serif; margin: 40px; background-color: #f8f9fa; }
                .container { max-width: 1300px; margin: 0 auto; }
                .header-wrapper { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                h2 { color: #2C3E50; margin: 0; font-size: 26px; }
                .actions-wrapper { display: flex; gap: 12px; align-items: center; }
                .refresh-badge { background-color: #2ECC71; color: white; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase; }
                .download-btn { background-color: #34495E; color: white; padding: 6px 14px; border-radius: 4px; font-weight: bold; font-size: 12px; text-decoration: none; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.2s; }
                .download-btn:hover { background-color: #2C3E50; }
                table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden; }
                th { background-color: #2C3E50; color: white; padding: 15px; text-align: left; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
                td { padding: 14px 15px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-size: 15px; }
                tr:nth-child(even) { background-color: #f9fbf9; }
                tr:hover { background-color: #e8f8f0; transition: background 0.15s ease-in-out; }
                .badge { background-color: #E2FBE8; color: #1E7E34; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 12px; border: 1px solid #c3e6cb; }
                .address-text { color: #2980b9; font-weight: 500; }
                .delete-btn { background-color: #E74C3C; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 13px; font-weight: 500; transition: background 0.2s; }
                .delete-btn:hover { background-color: #C0392B; }
                .empty { text-align: center; color: #718096; padding: 30px; font-style: italic; }
            </style>
            <script>
                async function removeEntry(id) {
                    if (confirm("Are you sure you want to permanently delete this booking history?")) {
                        try {
                            const response = await fetch('/api/admin/bookings/' + id, { method: 'DELETE' });
                            if (response.ok) {
                                document.getElementById('row-' + id).remove();
                            } else {
                                alert("Failed to remove data.");
                            }
                        } catch(err) {
                            console.error(err);
                            alert("Connection error occurred.");
                        }
                    }
                }
            </script>
        </head>
        <body>
            <div class="container">
                <div class="header-wrapper">
                    <h2>📋 Madeena Catering - Live Booking Ledger</h2>
                    <div class="actions-wrapper">
                        <a href="/admin/ledger/download" class="download-btn">📥 Download Excel/CSV</a>
                        <span class="refresh-badge">⚡ Real-Time Live Data</span>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Event Date</th>
                            <th>Guests</th>
                            <th>Event Delivery Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        if (!bookings || bookings.length === 0) {
            html += `<tr><td colspan="7" class="empty">No live bookings found in the database yet.</td></tr>`;
        } else {
            bookings.forEach(b => {
                html += `
                    <tr id="row-${b._id}">
                        <td><b>${b.name || 'N/A'}</b></td>
                        <td>${b.phone || 'N/A'}</td>
                        <td>${b.eventDate || 'N/A'}</td>
                        <td>${b.guests || 'N/A'}</td>
                        <td class="address-text">${b.address || 'N/A'}</td>
                        <td><span class="badge">Confirmed</span></td>
                        <td>
                            <button class="delete-btn" onclick="removeEntry('${b._id}')">Remove</button>
                        </td>
                    </tr>
                `;
            });
        }
        
        html += `
                    </tbody>
                </table>
            </div>
        </body>
        </html>
        `;
        
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);
    } catch (e) {
        console.error("Ledger Generation Error:", e);
        res.status(500).send("<h3>❌ Failed to generate live report ledger.</h3>");
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});