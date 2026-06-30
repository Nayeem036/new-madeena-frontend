const { MongoClient } = require('mongodb');
const fs = require('fs');

// Connection URL to your local Docker MongoDB container
const url = 'mongodb://localhost:27017';
const dbName = 'catering'; 

async function main() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const bookings = await db.collection('bookings').find({}).toArray();

        let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 40px; background-color: #f8f9fa; }
                h2 { color: #2c3e50; text-align: center; margin-bottom: 30px; font-size: 28px; text-transform: uppercase; letter-spacing: 1px; }
                table { width: 100%; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden; }
                th { background-color: #2ecc71; color: white; padding: 15px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 14px; }
                td { padding: 14px 15px; border-bottom: 1px solid #edf2f7; color: #4a5568; font-size: 15px; }
                tr:nth-child(even) { background-color: #f9fbf9; }
                tr:hover { background-color: #e8f8f0; transition: background-color 0.2s ease; }
                .badge { background-color: #e2fbe8; color: #1e7e34; padding: 5px 10px; border-radius: 20px; font-weight: bold; font-size: 12px; border: 1px solid #c3e6cb; }
            </style>
        </head>
        <body>
            <h2>📋 Madeena Catering - Live Booking Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Event Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
        `;

        bookings.forEach(booking => {
            htmlContent += `
                <tr>
                    <td><strong>${booking.name || booking.customerName || 'N/A'}</strong></td>
                    <td>${booking.email || 'N/A'}</td>
                    <td>${booking.phone || 'N/A'}</td>
                    <td>${booking.date || booking.eventDate || 'N/A'}</td>
                    <td><span class="badge">Confirmed</span></td>
                </tr>
            `;
        });

        htmlContent += `
                </tbody>
            </table>
        </body>
        </html>
        `;

        fs.writeFileSync('../booking_report.html', htmlContent);
        console.log('✨ Elegant rows-and-columns HTML report successfully generated!');
    } catch (err) {
        console.error('Error generating report:', err);
    } finally {
        await client.close();
    }
}

main();