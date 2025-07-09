const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes'); // Adjust path if needed
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use('/uploads', express.static('uploads'));
// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Test route (optional)
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
