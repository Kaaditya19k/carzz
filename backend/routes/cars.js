const express = require('express');
const Car = require('../models/Car');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only jpg and png images are allowed'), false);
};
const upload = multer({ storage, fileFilter, limits: { files: 5, fileSize: 5 * 1024 * 1024 } });

// GET /api/cars - List all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cars - Add a new car (protected, with images)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Only admins can add cars' });
  }
  const { brand, model, price, year, status } = req.body;
  const images = req.files ? req.files.map(f => '/uploads/' + f.filename) : [];
  const car = new Car({ brand, model, price, year, status, images });
  try {
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 