const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    salePrice: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { versionKey: false }
);

const Product = mongoose.model('Product', productSchema);

module.exports = mongoose.models.Product || Product;
