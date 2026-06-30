const { MongoClient } = require('mongodb');
const fs = require('fs');

async function run() {
    // Connects over the host network to your MongoDB container
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    try {
        await client.connect();
        const bookings = await client.db('catering').collection('bookings').find({}).toArray();
        
        let html = `<html><head><meta charset="UTF-8"><style>
            body{font-family:"Segoe UI",sans-serif;margin:40px;background-color:#f8f9fa}
            h2{color:#2C3E50;text-align:center}
            table{width:100%;border-collapse:collapse;background:#fff;box-shadow:0 4px 6px rgba(0,0,0,0.1);border-radius:8px;overflow:hidden}
            th{background-color:#2ECC71;color:white;padding:15px;text-align:left;font-size:14px;text-transform:uppercase}
            td{padding:12px 15px;border-bottom:1px solid #edf2f7;color:#4a5568;font-size:15px}
            tr:nth-child(even){background-color:#f9fbf9}
            tr:hover{background-color:#e8f8f0}
            .badge{background-color:#E2FBE8;color:#1E7E34;padding:4px 10px;border-radius:20px;font-weight:bold;font-size:12px;border:1px solid #c3e6cb}
        </style></head><body>
        <h2>📋 Madeena Catering - Customer Bookings Ledger</h2>
        <table><tr><th>Customer Name</th><th>Email Address</th><th>Phone Number</th><th>Event Date</th><th>Status</th></tr>`;
        
        if (bookings.length === 0) {
            html += '<tr><td colspan="5" style="text-align:center;">No live bookings found in the database.</td></tr>';
        } else {
            bookings.forEach(b => {
                html += `<tr><td><b>${b.name || b.customerName || 'N/A'}</b></td><td>${b.email || 'N/A'}</td><td>${b.phone || 'N/A'}</td><td>${b.date || b.eventDate || 'N/A'}</td><td><span class="badge">Confirmed</span></td></tr>`;
            });
        }
        
        html += '</table></body></html>';
        fs.writeFileSync('booking_report.html', html);
        console.log('Report generated successfully inside container.');
    } catch(e) {
        console.error('Error:', e);
    } finally {
        await client.close();
    }
}
run();