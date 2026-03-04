const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  // Unique ID for the user (useful for the "Atharv M." profile in your UI)
  userId: { type: String, default: "shubham_01" },
  
  // The big total amount shown at the top of your dashboard
  totalAmount: { type: Number, required: true },
  
  // List of items categorized (for the 'Budget Categories' section)
  items: [{
    product: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
      type: String, 
      enum: ['Food', 'Travel', 'Shopping', 'Entertainment', 'Grocery', 'Dairy', 'Snacks', 'Cleaning', 'Personal Care', 'Cloths', 'Others'],
      default: 'Others'
    }
  }],

  // Metadata for the bar charts (Mon-Fri analysis)
  date: { type: Date, default: Date.now },
  merchantName: { type: String, default: "Unknown Store" }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);