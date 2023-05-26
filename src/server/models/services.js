const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    salePrice: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { versionKey: false }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = mongoose.models.Service || Service;
