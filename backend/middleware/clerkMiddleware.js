const { requireAuth } = require('@clerk/express');

// Middleware to verify Clerk session token and protect routes
const clerkMiddleware = requireAuth();

module.exports = clerkMiddleware;
