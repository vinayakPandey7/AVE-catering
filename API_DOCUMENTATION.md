# AVE Catering API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Admin Access

Only `admin@test.com` has admin privileges. All other users are regular users with limited access.

---

## 📋 Complete API Endpoints Summary

| Method     | Endpoint               | Access     | Description                     |
| ---------- | ---------------------- | ---------- | ------------------------------- |
| **GET**    | `/`                    | Public     | API status check                |
| **POST**   | `/users`               | Public     | Register new user               |
| **POST**   | `/users/login`         | Public     | User login                      |
| **GET**    | `/users`               | Admin Only | Get all users                   |
| **GET**    | `/users/profile`       | Private    | Get user profile                |
| **GET**    | `/products`            | Public     | Get all products (with filters) |
| **GET**    | `/products/:id`        | Public     | Get single product              |
| **GET**    | `/products/categories` | Public     | Get all categories              |
| **POST**   | `/products`            | Admin Only | Create new product              |
| **PUT**    | `/products/:id`        | Admin Only | Update product                  |
| **DELETE** | `/products/:id`        | Admin Only | Delete product                  |
| **POST**   | `/orders`              | Private    | Create new order                |
| **GET**    | `/orders`              | Admin Only | Get all orders                  |
| **GET**    | `/orders/:id`          | Private    | Get single order                |

---

## Server Health Check

### API Status

**GET** `/`

- **Description**: Check if the API server is running
- **Access**: Public
- **Response**:

```
API is running...
```

---

## User Endpoints

### 1. User Registration

**POST** `/users`

- **Description**: Register a new user (always creates regular user, not admin)
- **Access**: Public
- **Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "businessName": "John's Business", // Optional
  "phone": "1234567890" // Optional
}
```

- **Response**:

```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "token": "jwt_token_here"
}
```

- **Error Codes**: 400 (User exists), 403 (Admin email blocked)

### 2. User Login

**POST** `/users/login`

- **Description**: Authenticate user and get token
- **Access**: Public
- **Body**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Response**:

```json
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "isAdmin": false,
  "role": "user",
  "token": "jwt_token_here"
}
```

- **Error Codes**: 401 (Invalid credentials)

### 3. Get User Profile

**GET** `/users/profile`

- **Description**: Get logged-in user's profile
- **Access**: Private (requires JWT token)
- **Response**:

```json
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "role": "user",
  "isAdmin": false
}
```

- **Error Codes**: 401 (Unauthorized), 404 (User not found)

### 4. Get All Users

**GET** `/users`

- **Description**: Get list of all users (Admin only)
- **Access**: Private/Admin (only admin@test.com)
- **Response**:

```json
[
  {
    "_id": "user_id",
    "name": "Admin User",
    "email": "admin@test.com",
    "role": "admin"
  },
  {
    "_id": "user_id_2",
    "name": "Regular User",
    "email": "user@example.com",
    "role": "user"
  }
]
```

- **Error Codes**: 401 (Unauthorized), 403 (Admin required)

---

## Product Endpoints

### 1. Get All Products

**GET** `/products`

- **Description**: Fetch all products with optional filtering and pagination
- **Access**: Public
- **Query Parameters**:
  - `category` (optional): Filter by category name (case-insensitive)
  - `search` (optional): Search in name, description, brand, or SKU
  - `page` (optional, default: 1): Page number for pagination
  - `limit` (optional, default: 20): Number of products per page
- **Example**: `/products?category=beverages&page=1&limit=10`
- **Response**:

```json
{
  "products": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "sku": "SKU123",
      "category": "Beverages",
      "brand": "Brand Name",
      "price": 10.99,
      "pricePerCase": 120.0,
      "packSize": "12 x 500ml",
      "unit": "Case",
      "description": "Product description",
      "image": "cloudinary_image_url",
      "stockQuantity": 50,
      "inStock": true,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pages": 5,
    "hasNext": true,
    "hasPrev": false,
    "total": 100
  }
}
```

### 2. Get Product by ID

**GET** `/products/:id`

- **Description**: Get a single product by ID
- **Access**: Public
- **Response**:

```json
{
  "_id": "product_id",
  "name": "Product Name",
  "sku": "SKU123",
  "category": "Beverages",
  "brand": "Brand Name",
  "price": 10.99,
  "pricePerCase": 120.0,
  "packSize": "12 x 500ml",
  "unit": "Case",
  "description": "Product description",
  "image": "cloudinary_image_url",
  "imagePublicId": "cloudinary_public_id",
  "stockQuantity": 50,
  "inStock": true
}
```

- **Error Codes**: 404 (Product not found)

### 3. Get Product Categories

**GET** `/products/categories`

- **Description**: Get all unique product categories with product counts
- **Access**: Public
- **Response**:

```json
[
  {
    "name": "Beverages",
    "count": 25
  },
  {
    "name": "Snacks",
    "count": 30
  },
  {
    "name": "Cleaning",
    "count": 15
  }
]
```

### 4. Create Product

**POST** `/products`

- **Description**: Create a new product (Admin only)
- **Access**: Private/Admin (only admin@test.com)
- **Content-Type**: `multipart/form-data`
- **Form Data**:

```
name: Product Name
sku: SKU123 (must be unique)
category: Beverages
brand: Brand Name
price: 10.99
pricePerCase: 120.00
packSize: 12 x 500ml
unit: Case
description: Product description
stockQuantity: 50
image: [file upload - required]
```

- **Response**: Created product object
- **Error Codes**: 400 (SKU exists, image required), 401 (Unauthorized), 403 (Admin required)

### 5. Update Product

**PUT** `/products/:id`

- **Description**: Update an existing product (Admin only)
- **Access**: Private/Admin (only admin@test.com)
- **Content-Type**: `multipart/form-data`
- **Form Data**: Same as create (all fields optional except ID)
- **Response**: Updated product object
- **Error Codes**: 404 (Product not found), 401 (Unauthorized), 403 (Admin required)

### 6. Delete Product

**DELETE** `/products/:id`

- **Description**: Delete a product (Admin only)
- **Access**: Private/Admin (only admin@test.com)
- **Response**:

```json
{
  "message": "Product deleted successfully"
}
```

- **Error Codes**: 404 (Product not found), 401 (Unauthorized), 403 (Admin required)

---

## Order Endpoints

### 1. Create Order

**POST** `/orders`

- **Description**: Create a new order
- **Access**: Private (requires JWT token)
- **Body**:

```json
{
  "orderItems": [
    {
      "_id": "product_id",
      "name": "Product Name",
      "qty": 2,
      "image": "product_image_url",
      "price": 10.99
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "City",
    "postalCode": "12345",
    "country": "Country"
  },
  "paymentMethod": "Credit Card",
  "itemsPrice": 21.98,
  "taxPrice": 1.76,
  "shippingPrice": 5.0,
  "totalPrice": 28.74
}
```

- **Response**: Created order object
- **Error Codes**: 400 (No order items), 401 (Unauthorized)

### 2. Get Order by ID

**GET** `/orders/:id`

- **Description**: Get order details by ID
- **Access**: Private (user can only see their own orders)
- **Response**:

```json
{
  "_id": "order_id",
  "orderItems": [...],
  "user": {
    "name": "User Name",
    "email": "user@example.com"
  },
  "shippingAddress": {...},
  "paymentMethod": "Credit Card",
  "itemsPrice": 21.98,
  "taxPrice": 1.76,
  "shippingPrice": 5.00,
  "totalPrice": 28.74,
  "isPaid": false,
  "isDelivered": false,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

- **Error Codes**: 401 (Unauthorized), 404 (Order not found)

### 3. Get All Orders

**GET** `/orders`

- **Description**: Get all orders (Admin only)
- **Access**: Private/Admin (only admin@test.com)
- **Response**: Array of order objects with user details
- **Error Codes**: 401 (Unauthorized), 403 (Admin required)

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "stack": "Error stack trace (only in development)"
}
```

## Common HTTP Status Codes

- **200**: Success
- **201**: Created successfully
- **400**: Bad request (validation error, missing data)
- **401**: Unauthorized (invalid or missing token)
- **403**: Forbidden (admin privileges required)
- **404**: Not found
- **500**: Internal server error

---

## Authentication Flow Example

1. **Register/Login** to get JWT token
2. **Store token** in your app (localStorage, state management, etc.)
3. **Include token** in Authorization header for protected routes
4. **Handle token expiry** by redirecting to login

```javascript
// Example API call with token
const response = await fetch("/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${userToken}`,
  },
  body: JSON.stringify(productData),
});
```

---

## Admin Credentials

**Email**: admin@test.com  
**Password**: 123456789

⚠️ **Important**: Only this specific email can have admin privileges. All other users will be regular users regardless of their role in the database.

---

## Image Upload Notes

- Product images are stored on **Cloudinary**
- Supported formats: JPG, PNG, WebP
- Images are automatically optimized (800x800px max, auto quality/format)
- Use `multipart/form-data` content type for image uploads
- Image field name: `image`

---

## Sample Frontend Integration

```javascript
// Login user
const login = async (email, password) => {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
};

// Get products with category filter
const getProducts = async (category = "") => {
  const url = category ? `/api/products?category=${category}` : "/api/products";
  const response = await fetch(url);
  return response.json();
};

// Create product (admin only)
const createProduct = async (formData, token) => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // FormData object with image
  });
  return response.json();
};
```

---

## Database Information

- **Database**: MongoDB Atlas
- **Total Products**: 377+ products across 6 categories
- **Categories**: Beverages, Cleaning, Frozen, Health & Beauty, Mexican Items, Snacks
- **Image Storage**: Cloudinary CDN
- **Authentication**: JWT with bcrypt password hashing

---

## 🛠️ Admin Utilities & Scripts

### Data Import Scripts (Backend Only)

These are server-side scripts for data management:

```bash
# Import users and products from seeder
cd backend && pnpm run data:import

# Destroy all data (users, products, orders)
cd backend && pnpm run data:destroy

# Import products from Excel file
cd backend && pnpm run import:products

# Update existing products with Cloudinary images
cd backend && pnpm run update:images
```

### Available Package Scripts

```json
{
  "start": "node dist/server.js",
  "dev": "nodemon",
  "build": "tsc",
  "data:import": "node --loader ts-node/esm seeder.ts",
  "data:destroy": "node --loader ts-node/esm seeder.ts -d",
  "import:products": "node --loader ts-node/esm dataImporter.ts import",
  "update:images": "node --loader ts-node/esm imageUpdater.ts update-images"
}
```

---

## 🧪 Testing the API

### Quick Test Commands

```bash
# Test server health
curl http://localhost:5000/api

# Test user login (admin)
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "123456789"}'

# Test get products
curl http://localhost:5000/api/products

# Test get categories
curl http://localhost:5000/api/products/categories

# Test products with category filter
curl "http://localhost:5000/api/products?category=beverages"

# Test admin endpoints (replace TOKEN with actual JWT)
curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/users
```

### Test Data Available

- **Admin User**: admin@test.com / 123456789
- **Products**: 377+ products across 6 categories
- **Categories**: Beverages, Cleaning, Frozen, Health & Beauty, Mexican Items, Snacks

---

## 🔧 Development Environment

### Server Configuration

- **Port**: 5000 (configurable via PORT env variable)
- **Environment**: Development mode with Morgan logging
- **CORS**: Enabled for all origins
- **File Uploads**: Multer middleware with Cloudinary integration

### Environment Variables (.env)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

This API is ready for production use with proper security, authentication, and data validation!
