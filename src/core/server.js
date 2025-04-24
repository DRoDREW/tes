const express = require('express');
const cors = require('cors');
const routes = require('./API/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Path ${req.path} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: 'error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`⚡️Server is running on http://localhost:${PORT}`);
});