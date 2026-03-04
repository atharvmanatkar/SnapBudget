process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const Receipt = require('./models/Reciept'); 
const { extractProducts } = require('./services/geminiService');

const app = express();
const upload = multer({ dest: 'uploads/' });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

let lastRequestTime = 0;
const REQUEST_INTERVAL = 1000;

// Middleware for Rate Limiting
const rateLimiter = (req, res, next) => {
    if (Date.now() - lastRequestTime < REQUEST_INTERVAL) {
        return res.status(429).json({ error: "Too many requests, slow down!" });
    }
    lastRequestTime = Date.now();
    next();
};

app.get('/test', (req, res) => {
    res.json({ message: "Hello Shubham! Connection Successful! 🚀" });
});

// Main Upload Route
app.post('/upload', rateLimiter, upload.single('receipt'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No image uploaded.');

        // 1. Call Gemini Service to get data
        const aiResult = await extractProducts(req.file.path);
        console.log("✅ AI Extracted Data:", aiResult);

        // 2. Calculate values for the Dashboard
        const total = aiResult.reduce((sum, item) => sum + item.price, 0);
        
        // 3. Save to MongoDB with your new Schema fields
        const newReceipt = new Receipt({
            userId: "shubham_01", 
            totalAmount: total,
            items: aiResult.map(item => ({
                product: item.product,
                price: item.price,
                category: item.category || 'Others'
            })),
            // Ensure date is captured for your Mon-Fri bar charts
            date: new Date(),
            // Optional: You could update your prompt to extract merchantName too
            merchantName: "Recent Scan" 
        });

        const savedReceipt = await newReceipt.save();
        console.log("✅ Data saved to MongoDB!");

        // 4. Cleanup: Delete temp file
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // 5. Send enriched response back to Mobile
        res.json({
            success: true,
            message: "Receipt processed and saved!",
            data: savedReceipt
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to process receipt.",
            details: error.message 
        });
    }
});

// Route to get daily spending for the Weekly Analysis chart
app.get('/api/spending-stats', async (req, res) => {
    try {
        const stats = await Receipt.aggregate([
            {
                $group: {
                    // 1=Sun, 2=Mon, 3=Tue, 4=Wed, 5=Thu, 6=Fri, 7=Sat
                    _id: { $dayOfWeek: "$date" }, 
                    totalSpent: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

// Route to get the Monthly Total for that big black card
app.get('/api/total-spending', async (req, res) => {
    try {
        const result = await Receipt.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        res.json({ total: result[0]?.total || 0 });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(5000, '0.0.0.0', () => console.log('Server running on port 5000'));