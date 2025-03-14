# FB Analyzer API Gateway

API Gateway service for the FB Analyzer project. This service acts as a central entry point for all API requests, routing them to the appropriate backend services.

## Features

- Proxies requests to appropriate backend services
- Handles CORS and security headers
- Provides centralized error handling
- Includes health check endpoint
- Configurable via environment variables

## Architecture

The API Gateway serves as the entry point for all client requests and routes them to the appropriate backend services:

- `/api/events/*` - Routes to the Event Fetcher service
- `/api/auth/*` - Routes to the Authentication service

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy example environment file
cp .env.example .env

# Start the service
npm start
```

### Environment Variables

Copy the `.env.example` file to `.env` and adjust the values as needed:

```
# API Gateway Configuration
PORT=8000
NODE_ENV=development

# Service URLs
EVENT_FETCHER_URL=http://fb-analyzer-post-fetcher:8000
AUTH_SERVICE_URL=http://fb-analyzer-auth-service:8000

# CORS Configuration
CORS_ORIGIN=*
```

## Docker

The service can be built and run using Docker:

```bash
# Build the image
docker build -t fb-analyzer-api-gateway .

# Run the container
docker run -p 8000:8000 fb-analyzer-api-gateway
```

## Development

```bash
# Run in development mode with auto-reload
npm run dev
```

## Testing

```bash
# Run tests
npm test
```
