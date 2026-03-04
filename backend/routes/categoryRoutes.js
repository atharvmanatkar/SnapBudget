const express = require('express');
const Receipt = require('../models/Reciept');
const router = express.Router();

// Category Breakdown
router.get('/breakdown', async (req, res) => {
    try {
        const breakdown = await Receipt.aggregate([
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.category",
                    total: { $sum: "$items.price" }
                }
            },
            { $sort: { total: -1 } }
        ]);
        res.json(breakdown);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Single Category Details
router.get('/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const receipts = await Receipt.find({
            "items.category": category
        });
        res.json(receipts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;