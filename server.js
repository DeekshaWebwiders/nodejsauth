const express = require('express');
const app = express();
require('dotenv').config();

// ✅ Add this middleware to parse JSON
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
