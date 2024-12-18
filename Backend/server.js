const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();



// MongoDB connection


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ success: false, message: 'User already exists' });

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    res.json({ success: false, message: 'Error during signup' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.json({ success: false, message: 'Invalid credentials' });

    res.json({ success: true, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.json({ success: false, message: 'Error during login' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});