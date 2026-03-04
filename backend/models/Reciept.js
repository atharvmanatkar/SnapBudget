const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  userId: { type: String, default: "shubham_01" },
  // Add this field:
  imageUrl: { type: String, required: true }, 
  totalAmount: { type: Number, required: true },
  items: Array,
  date: { type: Date, default: Date.now },
  merchantName: String
});

module.exports = mongoose.model('Receipt', ReceiptSchema);