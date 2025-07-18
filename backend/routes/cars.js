const express = require('express');
const Car = require('../models/Car');
const auth = require('../middleware/auth');
const multer = require('multer'); // Added multer
const router = express.Router();

// Set up multer for memory storage (store image in MongoDB, not local storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET /api/cars - List all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cars - Add a new car (protected, with image and type)
router.post('/', auth, upload.single('image'), async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Only admins can add cars' });
  }
  const { brand, model, price, year, status, type } = req.body;
  let image = undefined;
  if (req.file) {
    image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }
  const car = new Car({ brand, model, price, year, status, type, image });
  try {
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/cars/:id - Get car by ID
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/cars/:id/image - Get car image by ID
router.get('/:id/image', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car || !car.image || !car.image.data) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', car.image.contentType);
    res.send(car.image.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 