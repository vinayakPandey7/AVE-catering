# 🚀 Wholesale Market Server

Production-ready Express.js API server for the Wholesale Market platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- MongoDB
- Redis (optional)

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# API available at http://localhost:5000
```

### Production
```bash
# Build TypeScript
npm run build

# Start production server
npm run start
```

### Docker
```bash
# Development
docker-compose up -d

# Production
./deploy.sh production
```

## 📁 Project Structure

```
server/
├── config/                 # Database and service configurations
├── controllers/            # Route controllers
├── middleware/             # Custom middleware
├── models/                 # Database models
├── routes/                 # API routes
├── utils/                  # Utility functions
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose
├── nginx.conf             # Nginx configuration
└── deploy.sh              # Deployment script
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run lint         # Lint code
npm run test         # Run tests
npm run type-check   # TypeScript type checking
npm run clean        # Clean build artifacts
```

## 🌐 Environment Variables

Copy `env.example` to `.env`:

```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wholesale_market
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
./deploy.sh production
```

## 📊 API Endpoints

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - List categories
- `GET /api/categories/:slug` - Get category
- `POST /api/categories` - Create category (Admin)

### Orders
- `GET /api/orders` - List orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order

### Users
- `POST /api/users/login` - Login
- `POST /api/users/register` - Register
- `GET /api/users/profile` - Get profile

### Health
- `GET /health` - Health check

## 🔧 Features

- ✅ **Express.js 5** with TypeScript
- ✅ **MongoDB** with Mongoose ODM
- ✅ **Redis** caching layer
- ✅ **JWT Authentication** with middleware
- ✅ **File Upload** with Cloudinary
- ✅ **Rate Limiting** and security
- ✅ **Structured Logging** with Winston
- ✅ **Health Checks** and monitoring
- ✅ **CORS** and security headers

## 🚀 Deployment Options

### Railway
```bash
# Connect your GitHub repository
# Configure environment variables
# Deploy automatically
```

### Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Deploy
git push heroku main
```

### AWS ECS
```bash
# Build Docker image
docker build -t wholesale-market-server .

# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin your-account.dkr.ecr.region.amazonaws.com
docker tag wholesale-market-server:latest your-account.dkr.ecr.region.amazonaws.com/wholesale-market-server:latest
docker push your-account.dkr.ecr.region.amazonaws.com/wholesale-market-server:latest
```

## 📱 Service URLs

- **API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **MongoDB**: mongodb://localhost:27017
- **Redis**: redis://localhost:6379
- **Nginx**: http://localhost:8080

## 🔒 Security Features

- ✅ **Helmet.js** security headers
- ✅ **Rate Limiting** with express-rate-limit
- ✅ **CORS** configuration
- ✅ **Input Validation** middleware
- ✅ **JWT Authentication** with proper middleware
- ✅ **Password Hashing** with bcryptjs

## 📊 Monitoring

### Health Checks
```bash
# API Health
curl http://localhost:5000/health

# MongoDB Health
docker exec wholesale-mongodb mongosh --eval "db.runCommand('ping')"

# Redis Health
docker exec wholesale-redis redis-cli ping
```

### Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f server
docker-compose logs -f mongodb
docker-compose logs -f redis
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🆘 Support

For support, create an issue or contact the development team.
