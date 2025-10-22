// API Usage Examples for AVE Catering Client
// This file demonstrates how to use the mapped API services

import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductCategories 
} from '../lib/api/services/productService';

import { 
  getCategories, 
  getCategoryTree, 
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory 
} from '../lib/api/services/categoryService';

import { 
  loginUser, 
  registerUser, 
  getUserProfile, 
  getAllUsers,
  setAuthToken 
} from '../lib/api/services/authService';

import { 
  createOrder, 
  getOrderById, 
  getAllOrders 
} from '../lib/api/services/orderService';

// ============================================================================
// PRODUCTS API EXAMPLES
// ============================================================================

// Get all products with filters
export const fetchProductsExample = async () => {
  try {
    // Get products with pagination
    const products = await getProducts({ 
      page: 1, 
      limit: 20 
    });
    console.log('Products:', products);

    // Get products by category
    const categoryProducts = await getProducts({ 
      category: 'beverages',
      page: 1,
      limit: 10
    });
    console.log('Category Products:', categoryProducts);

    // Search products
    const searchResults = await getProducts({ 
      search: 'coffee',
      page: 1,
      limit: 10
    });
    console.log('Search Results:', searchResults);

  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Get single product
export const fetchSingleProductExample = async (productId: string) => {
  try {
    const product = await getProductById(productId);
    console.log('Product:', product);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

// Create new product (Admin)
export const createProductExample = async () => {
  try {
    const productData = {
      name: 'Premium Coffee Beans',
      sku: 'COFFEE-001',
      category: 'beverages',
      brand: 'AVE Catering',
      price: 25.99,
      pricePerCase: 250.00,
      packSize: '1kg',
      unit: 'bag',
      description: 'High-quality coffee beans',
      stockQuantity: 100
    };

    // Create product with image
    const product = await createProduct(productData, imageFile);
    console.log('Created Product:', product);
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

// ============================================================================
// CATEGORIES API EXAMPLES
// ============================================================================

// Get all categories
export const fetchCategoriesExample = async () => {
  try {
    const categories = await getCategories();
    console.log('Categories:', categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Get category tree
export const fetchCategoryTreeExample = async () => {
  try {
    const categoryTree = await getCategoryTree();
    console.log('Category Tree:', categoryTree);
    return categoryTree;
  } catch (error) {
    console.error('Error fetching category tree:', error);
  }
};

// Get category by slug
export const fetchCategoryBySlugExample = async (slug: string) => {
  try {
    const category = await getCategoryBySlug(slug);
    console.log('Category:', category);
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
  }
};

// ============================================================================
// AUTHENTICATION API EXAMPLES
// ============================================================================

// Login user
export const loginExample = async (email: string, password: string) => {
  try {
    const authResponse = await loginUser({ email, password });
    console.log('Login successful:', authResponse);
    
    // Set auth token for future requests
    setAuthToken(authResponse.token);
    
    return authResponse;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register user
export const registerExample = async () => {
  try {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      businessName: 'John\'s Restaurant',
      phone: '+1234567890'
    };

    const authResponse = await registerUser(userData);
    console.log('Registration successful:', authResponse);
    
    // Set auth token
    setAuthToken(authResponse.token);
    
    return authResponse;
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Get user profile
export const fetchUserProfileExample = async () => {
  try {
    const profile = await getUserProfile();
    console.log('User Profile:', profile);
    return profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

// ============================================================================
// ORDERS API EXAMPLES
// ============================================================================

// Create order
export const createOrderExample = async () => {
  try {
    const orderData = {
      orderItems: [
        {
          product: 'product-id-1',
          name: 'Coffee Beans',
          image: 'coffee.jpg',
          price: 25.99,
          quantity: 2,
          packSize: '1kg',
          unit: 'bag'
        }
      ],
      shippingAddress: {
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      paymentMethod: 'credit_card',
      itemsPrice: 51.98,
      taxPrice: 4.16,
      shippingPrice: 10.00,
      totalPrice: 66.14
    };

    const order = await createOrder(orderData);
    console.log('Order created:', order);
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
  }
};

// Get order by ID
export const fetchOrderExample = async (orderId: string) => {
  try {
    const order = await getOrderById(orderId);
    console.log('Order:', order);
    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
  }
};

// ============================================================================
// COMPLETE INTEGRATION EXAMPLE
// ============================================================================

export const completeIntegrationExample = async () => {
  console.log('🚀 Starting Complete API Integration Example...\n');

  try {
    // 1. Fetch all categories
    console.log('1. Fetching categories...');
    const categories = await fetchCategoriesExample();
    
    // 2. Fetch products
    console.log('2. Fetching products...');
    const products = await fetchProductsExample();
    
    // 3. Login user
    console.log('3. Logging in user...');
    const authResponse = await loginExample('admin@example.com', 'password');
    
    if (authResponse) {
      // 4. Get user profile
      console.log('4. Fetching user profile...');
      await fetchUserProfileExample();
      
      // 5. Create order (if authenticated)
      console.log('5. Creating order...');
      await createOrderExample();
    }

    console.log('\n✅ Complete integration example finished!');
    
  } catch (error) {
    console.error('❌ Integration example failed:', error);
  }
};

// ============================================================================
// ERROR HANDLING EXAMPLES
// ============================================================================

export const errorHandlingExample = async () => {
  try {
    // This will fail - product doesn't exist
    await getProductById('non-existent-id');
  } catch (error: any) {
    if (error.response) {
      console.log('API Error:', error.response.status, error.response.data);
    } else {
      console.log('Network Error:', error.message);
    }
  }
};

// ============================================================================
// USAGE IN REACT COMPONENTS
// ============================================================================

/*
// Example usage in a React component:

import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '../lib/api/services';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts({ limit: 20 }),
          getCategories()
        ]);
        
        setProducts(productsData.products);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Products ({products.length})</h1>
      <h2>Categories ({categories.length})</h2>
      {/* Render your components */}
    </div>
  );
};
*/
