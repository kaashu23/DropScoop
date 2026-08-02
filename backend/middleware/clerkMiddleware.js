const { clerkMiddleware } = require('@clerk/express');

// Middleware to verify Clerk session token and protect routes
// clerkMiddleware parses the token and attaches req.auth.
// Controllers will manually check if req.auth.userId exists.
module.exports = clerkMiddleware();
