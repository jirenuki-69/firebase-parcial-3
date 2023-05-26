const express = require('express');
const Sale = require('../models/sales.js');

const router = express.Router();

// Middleware para obtener una venta por su ID
async function getSale(req, res, next) {
  try {
    const {
      params: { id: saleId }
    } = req;
    const sale = await Sale.findById(saleId);

    if (sale == null) {
      return res.json({ message: 'Sale not found' });
    }

    res.sale = sale;
    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
}

router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    return res.json(sales);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productsServices, total } = req.body;

    if (!productsServices) {
      return res.json({ message: 'All fields are required' });
    }

    const sale = new Sale({ productsServices, total });

    const newSale = await sale.save();
    return res.json(newSale);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.delete('/:id', getSale, async (req, res) => {
  try {
    await Sale.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Sale deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
