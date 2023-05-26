const express = require('express');
const Service = require('../models/services.js');

const router = express.Router();

// Middleware para obtener un servicio por su ID
async function getService(req, res, next) {
  try {
    const {
      params: { id: serviceId }
    } = req;
    const service = await Service.findById(serviceId);

    if (service == null) {
      return res.json({ message: 'Service not found' });
    }

    res.service = service;
    next();
  } catch (error) {
    return res.json({ message: error.message });
  }
}

router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    return res.json(services);
  } catch (error) {
    returnres.json({ message: error.message });
  }
});

router.get('/:id', getService, (req, res) => {
  return res.json(res.service);
});

router.post('/', async (req, res) => {
  try {
    const { name, salePrice, price } = req.body;

    if (!name || !salePrice || !price) {
      return res.json({ message: 'All fields are required' });
    }

    const service = new Service({
      name,
      salePrice: Number(salePrice),
      price: Number(price)
    });

    if (service.salePrice < service.price) {
      return res.json({
        message: 'Sale Price must be higher than the service price'
      });
    }

    const newService = await service.save();
    return res.json(newService);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const {
    body: { name, salePrice, price }
  } = req;

  // Verificar campos vacíos
  if (!name || !salePrice || !price) {
    return res.json({ message: 'All fields are required' });
  }

  if (salePrice < price) {
    return res.json({
      message: 'Sale Price must be higher than the service price'
    });
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      {
        name,
        salePrice,
        price
      },
      { new: true }
    );

    if (!updatedService) {
      return res.json({ message: 'Service not found' });
    }

    return res.json(updatedService);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.delete('/:id', getService, async (req, res) => {
  try {
    await Service.findOneAndDelete({ _id: req.params.id });
    return res.json({ message: 'Service deleted' });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

module.exports = router;
