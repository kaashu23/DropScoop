const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const Sentry = require('@sentry/node');
require('dotenv').config();

const connectDB = require('./config/db');
require('./config/sentry'); // Initialize sentry if configured

// Import Routes
// (We will import routes when subagents finish creating them)
const flavorRoutes = require('./routes/flavorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const toppingRoutes = require('./routes/toppingRoutes');
const storeRoutes = require('./routes/storeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const couponRoutes = require('./routes/couponRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
// const stripeRoutes = require('./routes/stripeRoutes');

// Import Middlewares
const errorHandler = require('./middleware/errorHandler');

// Initialize Express App
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Set to frontend origin in production
    methods: ['GET', 'POST']
  }
});
app.set('io', io); // Make io accessible in controllers

// Connect to Database
connectDB();

// Sentry request handler must be the first middleware on the app
Sentry.setupExpressErrorHandler(app);

// Security and utility middlewares
app.use(helmet());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl) or if origin is in the list or matches Netlify/Render
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.netlify.app') || origin.endsWith('.onrender.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// We need raw body for Stripe webhook, so define it before express.json()
// app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(express.json()); // Body parser

// Apply Clerk middleware globally so req.auth is always available
const { clerkMiddleware } = require('@clerk/express');
app.use(clerkMiddleware());
// Setup Socket.io Connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/flavors', flavorRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/toppings', toppingRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

const settingsRoutes = require('./routes/settingsRoutes');
app.use('/api/admin/settings', settingsRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('DropScoop API is running');
});

// Start Cron Jobs
require('./cron/reviewCron'); 
require('./cron/orderCron');

// Error Handling Middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
