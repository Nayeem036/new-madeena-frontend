const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/booking', (req, res) => {
    console.log("Received Booking:", req.body);
    res.status(200).send({ message: "Booking received at Backend!" });
});

app.listen(5000, () => console.log("Backend running on port 5000"));