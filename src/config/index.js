/**
 * Configuration for the API Gateway
 * Centralizes access to environment variables and service endpoints
 */

// Load environment variables with defaults
const config = {
  // Server configuration
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Service endpoints
  services: {
    eventFetcher: {
      url: process.env.EVENT_FETCHER_URL || 'http://fb-analyzer-post-fetcher:8000',
      prefix: '/api/events'
    },
    authService: {
      url: process.env.AUTH_SERVICE_URL || 'http://fb-analyzer-auth-service:8000',
      prefix: '/api/auth'
    }
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};

module.exports = config;
