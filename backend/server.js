process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const { extractProducts } = require('./services/geminiService');

const app = express();
const upload = multer({ dest: 'uploads/' });

let lastRequestTime = 0;
const REQUEST_INTERVAL = 1000;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message: "Hello Shubham! Connection Successful! 🚀" });
});

app.post('/upload', (req, res, next) => {
    if (Date.now() - lastRequestTime < REQUEST_INTERVAL) {
        return res.status(429).json({ error: "Too many requests, slow down!" });
    }
    lastRequestTime = Date.now();
    next();
}, upload.single('receipt'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No image uploaded.');

        const aiResult = await extractProducts(req.file.path);

        console.log("✅ Success! Extracted Data:", aiResult);
        res.json(aiResult);

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to extract products from the uploaded bill.",
            details: error.message // optional for debugging
        });
    }
});

app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'));