/**
 * FB Analyzer API Gateway
 * Main entry point for the API Gateway service
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import configuration
const config = require('./config');

// Load environment variables
dotenv.config();

// Import routes
const routes = require('./routes');

// Create Express app
const app = express();

// Configure middleware
app.use(helmet()); // Security headers
app.use(cors(config.cors)); // Enable CORS with configuration
app.use(morgan('combined')); // HTTP request logging
app.use(express.json()); // Parse JSON request bodies

// Apply routes
app.use('/', routes);

// Apply error handling middleware
app.use(errorHandler);

// Define port
const PORT = config.port;

// Start server
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Services: ${Object.keys(config.services).join(', ')}`);
});

// Export app for testing
module.exports = app;
