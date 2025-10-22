# API Mapping: Server ↔ Client

## Server API Endpoints

### 1. Products API (`/api/products`)
| Method | Endpoint | Description | Client Service |
|--------|----------|-------------|----------------|
| GET | `/api/products` | Get all products with filters | `getProducts()` |
| GET | `/api/products/categories` | Get product categories | `getProductCategories()` |
| GET | `/api/products/:id` | Get single product | `getProductById()` |
| POST | `/api/products` | Create product (Admin) | `createProduct()` |
| PUT | `/api/products/:id` | Update product (Admin) | `updateProduct()` |
| DELETE | `/api/products/:id` | Delete product (Admin) | `deleteProduct()` |

### 2. Categories API (`/api/categories`)
| Method | Endpoint | Description | Client Service |
|--------|----------|-------------|----------------|
| GET | `/api/categories` | Get all categories | `getCategories()` |
| GET | `/api/categories/tree` | Get category tree | `getCategoryTree()` |
| GET | `/api/categories/:slug` | Get category by slug | `getCategoryBySlug()` |
| POST | `/api/categories/admin/create` | Create category (Admin) | `createCategory()` |
| PUT | `/api/categories/admin/:id` | Update category (Admin) | `updateCategory()` |
| DELETE | `/api/categories/admin/:id` | Delete category (Admin) | `deleteCategory()` |

### 3. Users API (`/api/users`)
| Method | Endpoint | Description | Client Service |
|--------|----------|-------------|----------------|
| POST | `/api/users` | Register user | `registerUser()` |
| POST | `/api/users/login` | Login user | `loginUser()` |
| GET | `/api/users/profile` | Get user profile | `getUserProfile()` |
| GET | `/api/users` | Get all users (Admin) | `getAllUsers()` |

### 4. Orders API (`/api/orders`)
| Method | Endpoint | Description | Client Service |
|--------|----------|-------------|----------------|
| POST | `/api/orders` | Create order | `createOrder()` |
| GET | `/api/orders/:id` | Get order by ID | `getOrderById()` |
| GET | `/api/orders` | Get all orders (Admin) | `getAllOrders()` |

## Current Server Status
- **Base URL**: `http://localhost:5001/api`
- **Port**: 5001 (fallback from 5000 due to macOS Control Center)
- **Health Check**: `http://localhost:5001/health`

## Client API Configuration
- **Base URL**: `http://localhost:5001/api` ✅ (Updated)
- **Services**: All mapped and functional
- **Authentication**: Bearer token support
- **File Upload**: Multipart form data support

## Missing Endpoints
The client is missing some server endpoints:
1. `/api/orders/user` - Get user's orders (not implemented in server)
2. User profile update endpoint (not implemented in server)

## Notes
- All client services are properly mapped to server endpoints
- Authentication middleware is commented out in server routes
- File upload support is implemented for products and categories
- CORS is configured for `http://localhost:3000`
