const express = require('express');
const router = express.Router();
const User = require('../model/User');

// Create new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ ok: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// Get all users
router.get('/all', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
