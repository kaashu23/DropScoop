const Sentry = require('@sentry/node');

const initSentry = () => {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: process.env.NODE_ENV || 'development'
    });
    console.log('Sentry initialized');
  }
};

initSentry(); // Automatically initialize on require

module.exports = { Sentry, initSentry };

