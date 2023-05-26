const express = require('express');
const encryption = require('../helpers/encryption.js');
const Product = require('../models/products.js');

const router = express.Router();

// Middleware para obtener un producto por su ID
async function getProduct(req, res, next) {
  try {
    const {
      params: { id: productId }
    } = req;
    const product = await Product.findById(productId);

    if (product == null) {
      return res.json({ message: 'Product not found' });
    }

    res.product = product;
    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
};

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    returnres.json({ message: error.message });
  }
});

router.get('/:id', getProduct, (req, res) => {
  return res.json(res.product);
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    salePrice: req.body.salePrice,
    purchasePrice: req.body.purchasePrice,
    quantity: req.body.quantity || 0,
  });

  if (product.salePrice < product.purchasePrice) {
    return res.json({ message: 'Sale Price must be higher than the Purchase Price' });
  }

  try {
    const newProduct = await product.save();
    return res.json(newProduct);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

//! Put or Patch
router.put('');

router.delete('/:id', getProduct, async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    return res.json({ message: 'Product deleted' });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

module.exports = router;
