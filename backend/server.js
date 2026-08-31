const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const app = express();

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/strivers-student')
.then(async () => {
  console.log('✅ MongoDB connected');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const path = require('path');

// API routes
app.use('/api/auth', authRoutes);

// Basic route for API testing
app.get('/api', (req, res) => {
  res.json({ message: 'Strivers Student API' });
});

// Serve static files from the React frontend app with caching headers
app.use(express.static(path.join(__dirname, '../frontend/dist'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.includes('/assets/')) {
      // Hashed Vite assets can be cached immutably for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.endsWith('.html')) {
      // HTML entry point should always revalidate
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.endsWith('.xml') || filePath.endsWith('.txt')) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Catch-all route to serve the frontend's index.html for any other GET requests
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.setHeader('Cache-Control', 'no-cache');
    return res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
  }
  next();
});

// 404 handler for unmatched API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `API route '${req.originalUrl}' not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});