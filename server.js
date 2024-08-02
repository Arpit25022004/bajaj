const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/process', (req, res) => {
    const data = req.body.data;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid data format. "data" should be an array.' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && /^[a-zA-Z]$/.test(item));
    const highestAlphabet = alphabets.length ? [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : [];

    const response = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
