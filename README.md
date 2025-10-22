# 🚀 Wholesale Market - Production-Ready E-commerce Platform

A modern, scalable, and production-ready wholesale e-commerce platform with **independent frontend and backend deployments**.

## 📁 Project Structure

```
wholesale-market/
├── client/                 # 🎨 Frontend (Next.js) - Independent Deployment
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/               # Utilities and configurations
│   ├── public/            # Static assets
│   ├── Dockerfile         # Client Docker configuration
│   ├── docker-compose.yml # Client Docker Compose
│   ├── nginx.conf         # Client Nginx configuration
│   ├── deploy.sh          # Client deployment script
│   └── README.md          # Client documentation
├── server/                 # 🚀 Backend (Express.js) - Independent Deployment
│   ├── config/            # Database and service configurations
│   ├── controllers/       # API controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── Dockerfile         # Server Docker configuration
│   ├── docker-compose.yml # Server Docker Compose
│   ├── nginx.conf         # Server Nginx configuration
│   ├── deploy.sh          # Server deployment script
│   └── README.md          # Server documentation
├── .github/                # CI/CD workflows
├── deploy.sh              # Main deployment script
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Docker & Docker Compose

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd wholesale-market
   ```

2. **Frontend Development**
   ```bash
   cd client
   npm install
   npm run dev
   # Open http://localhost:3000
   ```

3. **Backend Development**
   ```bash
   cd server
   npm install
   npm run dev
   # API available at http://localhost:5000
   ```

### Docker Development
```bash
# Deploy both services
./deploy.sh all development

# Deploy only frontend
./deploy.sh client development

# Deploy only backend
./deploy.sh server development
```

## 🎯 Deployment Options

### **Independent Deployments**

#### **Frontend (Client)**
```bash
cd client
./deploy.sh production
```

#### **Backend (Server)**
```bash
cd server
./deploy.sh production
```

### **Combined Deployment**
```bash
# Deploy both services
./deploy.sh all production

# Deploy only frontend
./deploy.sh client production

# Deploy only backend
./deploy.sh server production
```

## 🌐 Cloud Deployment

### **Frontend Deployment**
- ✅ **Vercel** (Recommended for Next.js)
- ✅ **Netlify**
- ✅ **AWS Amplify**
- ✅ **Any static hosting**

### **Backend Deployment**
- ✅ **Railway** (Recommended for Node.js)
- ✅ **Heroku**
- ✅ **AWS ECS**
- ✅ **DigitalOcean App Platform**

## 📊 Service URLs

| Service | Port | URL |
|---------|------|-----|
| **Frontend** | 3000 | http://localhost:3000 |
| **Backend** | 5000 | http://localhost:5000 |
| **MongoDB** | 27017 | mongodb://localhost:27017 |
| **Redis** | 6379 | redis://localhost:6379 |

## 🛠️ Available Commands

### **Root Level**
```bash
./deploy.sh all production     # Deploy both services
./deploy.sh client production  # Deploy frontend only
./deploy.sh server production  # Deploy backend only
```

### **Frontend (Client)**
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
./deploy.sh production  # Deploy with Docker
```

### **Backend (Server)**
```bash
cd server
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
./deploy.sh production  # Deploy with Docker
```

## 🏗️ Architecture

### **Frontend (Next.js)**
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **UI Components**: Radix UI + Custom Components
- **Performance**: Image optimization, code splitting, caching

### **Backend (Express.js)**
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose
- **Cache**: Redis
- **Authentication**: JWT
- **File Upload**: Cloudinary
- **Security**: Helmet, CORS, Rate Limiting

## 🔧 Configuration

### **Frontend Environment**
```bash
# client/.env.local
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_APP_NAME=Wholesale Market
```

### **Backend Environment**
```bash
# server/.env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-mongodb-url
JWT_SECRET=your-super-secret-jwt-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
```

## 📈 Production Benefits

### **Scalability**
- ✅ **Independent scaling** of frontend and backend
- ✅ **Different hosting** for each service
- ✅ **Load balancing** for high traffic
- ✅ **CDN integration** for frontend

### **Deployment Flexibility**
- ✅ **Separate deployments** without affecting each other
- ✅ **Different environments** for each service
- ✅ **Rollback capability** for individual services
- ✅ **A/B testing** for frontend

### **Cost Optimization**
- ✅ **Pay only** for what you use
- ✅ **Scale independently** based on demand
- ✅ **Use different** hosting providers
- ✅ **Optimize costs** per service

## 🚀 Production Deployment

### **Recommended Strategy**

1. **Deploy Backend First**
   ```bash
   ./deploy.sh server production
   ```

2. **Wait for Backend to be Ready**
   ```bash
   # Check health: http://localhost:5000/health
   ```

3. **Deploy Frontend**
   ```bash
   ./deploy.sh client production
   ```

## 📚 Documentation

- [Frontend Documentation](./client/README.md)
- [Backend Documentation](./server/README.md)
- [Separate Deployment Guide](./SEPARATE_DEPLOYMENT_GUIDE.md)
- [API Integration Summary](./API_INTEGRATION_SUMMARY.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@wholesalemarket.com or create an issue on GitHub.

---

**Built with ❤️ for the wholesale market industry**