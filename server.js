const express = require('express');
const cors = require('cors');
const pool = require('./db/connection');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server running!' });
});

// Test database connection
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Database connected!', 
      timestamp: result.rows[0].now 
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
