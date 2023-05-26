const express = require('express');
const jwt = require('jsonwebtoken');
const jwtExpireTime = require('../helpers/constants.js');
const { register } = require('../controllers/auth.js');
const encryption = require('../helpers/encryption.js');

const User = require('../models/users.js');


const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = User.find({ email });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    if (!encryption.matchPassword(password, user.password)) {
      return res.json({ message: 'Incorrect Password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: jwtExpireTime }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server error' });
  }
});

// User register
router.post('/register', register);

module.exports = router;
