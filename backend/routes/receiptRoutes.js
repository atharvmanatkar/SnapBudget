const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Receipt = require('../models/Reciept');
const { extractProducts } = require('../services/geminiService');

const router = express.Router();

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ================= STORAGE CONFIG =================
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'SnapBudget_Receipts',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// ================= RATE LIMITER =================
let lastRequestTime = 0;
const REQUEST_INTERVAL = 1000;

const rateLimiter = (req, res, next) => {
  if (Date.now() - lastRequestTime < REQUEST_INTERVAL) {
    return res.status(429).json({ error: "Too many requests, slow down!" });
  }
  lastRequestTime = Date.now();
  next();
};

// ================= ROUTES =================

// Upload Receipt
router.post('/upload', rateLimiter, upload.single('receipt'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No image uploaded.');

    const aiResult = await extractProducts(req.file.path);

    const total = aiResult.reduce((sum, item) => sum + item.price, 0);

    const newReceipt = new Receipt({
      userId: "shubham_01",
      totalAmount: total,
      items: aiResult.map(item => ({
        product: item.product,
        price: item.price,
        category: item.category || 'Others'
      })),
      date: new Date(),
      merchantName: "Recent Scan",
      imageUrl: req.file.path
    });

    const savedReceipt = await newReceipt.save();

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

// Category Stats
router.get('/api/stats/category-data', async (req, res) => {
  try {
    const stats = await Receipt.aggregate([
      { $match: { userId: "shubham_01" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.category",
          totalAmount: { $sum: "$items.price" },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

// Weekly Spending
// ... existing upload and category-data routes ...

// 1. Get Total Spending for the Black Card
router.get('/api/total-spending', async (req, res) => {
    try {
        const result = await Receipt.aggregate([
            { $match: { userId: "shubham_01" } }, // Ensures it's only your data
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        res.json({ total: result[0]?.total || 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get Daily Stats for the Bar Chart
router.get('/api/daily-stats', async (req, res) => {
    try {
        const stats = await Receipt.aggregate([
            { $match: { userId: "shubham_01" } },
            {
                $group: {
                    _id: { $dayOfWeek: "$date" }, // 1 (Sun) to 7 (Sat)
                    amount: { $sum: "$totalAmount" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;