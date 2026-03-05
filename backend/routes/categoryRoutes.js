const express = require('express');
const router = express.Router();
const Receipt = require('../models/Reciept'); // Ensure this path correctly points to your model

// GET specific items by category from the items array
router.get('/items/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;

    const results = await Receipt.aggregate([
      // 1. "Flatten" the items array so each product is a separate document
      { $unwind: "$items" },
      
      // 2. Filter for items matching the clicked category
      { 
        $match: { 
          "items.category": { $regex: new RegExp(`^${categoryName}$`, 'i') } 
        } 
      },
      
      // 3. Reshape the data for the frontend
      {
        $project: {
          _id: 1,
          productName: "$items.product",
          price: "$items.price",
          date: "$date"
        }
      },
      
      // 4. Show newest first
      { $sort: { date: -1 } }
    ]);

    res.json(results);
  } catch (err) {
    console.error("Aggregation Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }

});

module.exports = router;