import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.ts';
import { errorHandler, notFound } from './middleware/errorMiddleware.ts';
import productRoutes from './routes/productRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import orderRoutes from './routes/orderRoutes.ts';
import categoryRoutes from './routes/categoryRoutes.ts';
import logger from './utils/logger.ts';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

// Function to find an available port starting from the desired port
const findAvailablePort = (startPort: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    import('net').then((net) => {
      const server = net.createServer();
      
      server.listen(startPort, () => {
        const port = server.address()?.port;
        server.close(() => resolve(port || startPort));
      });
      
      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          findAvailablePort(startPort + 1).then(resolve).catch(reject);
        } else {
          reject(err);
        }
      });
    }).catch(reject);
  });
};

// Start server with port fallback
const startServer = async () => {
  try {
    const availablePort = await findAvailablePort(parseInt(PORT.toString()));
    
    const server = app.listen(availablePort, '0.0.0.0', () => {
      logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${availablePort}`);
      logger.info(`📊 Health check available at http://localhost:${availablePort}/health`);
      
      if (availablePort !== parseInt(PORT.toString())) {
        logger.warn(`⚠️  Port ${PORT} was in use, server started on port ${availablePort} instead`);
        logger.warn('To use port 5000, disable AirPlay Receiver in System Preferences > Sharing');
      }
    });
    
    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer().then((serverInstance) => {
  // Graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    serverInstance.close(() => {
      logger.info('Process terminated');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    serverInstance.close(() => {
      logger.info('Process terminated');
      process.exit(0);
    });
  });
});

export default app;