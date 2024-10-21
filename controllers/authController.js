const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10)
    });

    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error in registration:', err.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Login user
module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ error: 'Server error during login' });
  }
};
