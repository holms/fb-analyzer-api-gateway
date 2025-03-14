/**
 * API Gateway Routes
 * Defines routes and proxies requests to appropriate backend services
 */

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '0.1.0',
    services: Object.keys(config.services).map(key => ({
      name: key,
      url: config.services[key].url
    }))
  });
});

// API Documentation endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'FB Analyzer API Gateway',
    version: '0.1.0',
    endpoints: {
      '/health': 'Health check endpoint',
      '/api/events/*': 'Event fetcher service endpoints',
      '/api/auth/*': 'Authentication service endpoints'
    }
  });
});

// Proxy middleware options
const proxyOptions = {
  changeOrigin: true,
  pathRewrite: {
    '^/api/events': '', // Remove /api/events prefix when forwarding
    '^/api/auth': ''    // Remove /api/auth prefix when forwarding
  },
  logLevel: config.nodeEnv === 'development' ? 'debug' : 'info'
};

// Proxy requests to Event Fetcher service
router.use(
  '/api/events',
  createProxyMiddleware({
    ...proxyOptions,
    target: config.services.eventFetcher.url,
    pathRewrite: { '^/api/events': '' }
  })
);

// Proxy requests to Auth Service
router.use(
  '/api/auth',
  createProxyMiddleware({
    ...proxyOptions,
    target: config.services.authService.url,
    pathRewrite: { '^/api/auth': '' }
  })
);

// Catch-all route for 404s
router.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

module.exports = router;
