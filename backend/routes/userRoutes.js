const express = require('express');
const User = require('../models/UserNew');
const router = express.Router();

// Create user
router.post('/api/users', async (req, res) => {
  try {
    const { username,name, email, password} = req.body;

    const user = new User({
      username,
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;