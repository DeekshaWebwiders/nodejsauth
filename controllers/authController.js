const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [id] = await db('users').insert({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered', userId: id });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};


exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
 
  try {
    console.log("hello");
    // Check if user exists
    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate random 6-digit password
    const newPasswordPlain = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPasswordPlain, 10);

    // Update password in DB
    await db('users').where({ id: user.id }).update({ password: hashedPassword });

    // Return plain password (normally you'd email this)
    res.json({
      message: 'New password generated and updated.',
      newPassword: newPasswordPlain
    });
  } catch (err) {
    console.log("hii");
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

