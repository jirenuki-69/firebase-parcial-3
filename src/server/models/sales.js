const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema(
  {
    productsServices: { type: Array, required: true },
    total: { type: Number, required: true },
  },
  { versionKey: false }
);

const Sale = mongoose.model('Sale', saleSchema);

module.exports = mongoose.models.Sale || Sale;
