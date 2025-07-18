const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  type: { type: String, enum: ['petrol', 'diesel', 'ev', 'hybrid'], required: true }, // Added car type
  image: { data: Buffer, contentType: String }, // Added image storage
});

module.exports = mongoose.model('Car', carSchema); 