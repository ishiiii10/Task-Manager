const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Initialize app and environment variables
dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Configure CORS - allow all origins in development
const allowedOrigins = [
  'https://task-manager-anushrey10.vercel.app',
  'https://task-manager-git-main-anushrey10.vercel.app',
  'https://task-manager-anushrey10s-projects.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('Request from origin:', origin);
      // Allow anyway for now during testing
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enable preflight requests for all routes
app.options('*', cors());

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'unknown'}`);
  next();
});

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Backend is running', 
    timestamp: new Date().toISOString() 
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
