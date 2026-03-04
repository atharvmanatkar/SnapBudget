process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const receiptRoutes = require('./routes/receiptRoutes');

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());

// Test Route
app.get('/test', (req, res) => {
  res.json({ message: "Hello Shubham! Connection Successful! 🚀" });
});

// Use Receipt Routes
app.use('/', receiptRoutes);

app.listen(5000, '0.0.0.0', () =>
  console.log('Server running on port 5000')
);