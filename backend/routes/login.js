const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// POST /api/login
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return res.status(400).json({ message: 'Username/email and password required' });
  }
  try {
    let user = null;
    if (username && email) {
      user = await User.findOne({ $or: [{ username }, { email }] });
    } else if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    }
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, isAdmin: user.isAdmin });
  } catch (err) {
    console.error('Login error:', err.stack || err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 