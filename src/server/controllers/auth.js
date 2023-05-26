const jwt = require('jsonwebtoken');
const encryption = require('../helpers/encryption');
const jwtExpireTime = require('../helpers/constants');

const User = require('../models/users');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await encryption.encryptPassword(password);

    // Create a new user with hashed password
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: jwtExpireTime }
    );

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Something went wrong' });
  }
};

module.exports = { register };
