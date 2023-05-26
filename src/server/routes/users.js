const express = require('express');
const encryption = require('../helpers/encryption.js');
const User = require('../models/users.js');

const router = express.Router();

// Middleware para obtener un usuario por su ID
async function getUser(req, res, next) {
  try {
    const {
      params: { id: userId }
    } = req;
    const user = await User.findById(userId);

    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await encryption.encryptPassword(req.body.password)
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//! Put or Patch
router.put('');

router.delete('/:id', getUser, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
