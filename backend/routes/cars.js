const express = require('express');
const Car = require('../models/Car');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/cars - List all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/cars - Add a new car (protected, no images)
router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Only admins can add cars' });
  }
  const { brand, model, price, year, status } = req.body;
  const car = new Car({ brand, model, price, year, status });
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

module.exports = router; 