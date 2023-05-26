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
}

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
  try {
    const { name, salePrice, purchasePrice, quantity } = req.body;

    if (!name || !salePrice || !purchasePrice || !quantity) {
      return res.json({ message: 'All fields are required' });
    }

    const product = new Product({
      name,
      salePrice: Number(salePrice),
      purchasePrice: Number(purchasePrice),
      quantity: Number(quantity)
    });

    if (product.salePrice < product.purchasePrice) {
      return res.json({
        message: 'Sale Price must be higher than the Purchase Price'
      });
    }

    const newProduct = await product.save();
    return res.json(newProduct);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const {
    body: { name, salePrice, purchasePrice, quantity }
  } = req;

  if (salePrice < purchasePrice) {
    return res.json({
      message: 'Sale Price must be higher than the Purchase Price'
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        salePrice,
        purchasePrice,
        quantity
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.json({ message: 'Product not found' });
    }

    return res.json(updatedProduct);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.delete('/:id', getProduct, async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    return res.json({ message: 'Product deleted' });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

module.exports = router;
