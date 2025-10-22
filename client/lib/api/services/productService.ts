import api from '../../api';

export interface Product {
  _id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  pricePerCase: number;
  packSize: string;
  unit: string;
  description: string;
  image: string;
  imagePublicId?: string;
  stockQuantity: number;
  inStock: boolean;
  isFeatured?: boolean;
  isOnOffer?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    page: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
    total: number;
  };
}

export interface CreateProductRequest {
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  pricePerCase: number;
  packSize: string;
  unit: string;
  description: string;
  stockQuantity: number;
  minStock?: number;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  _id: string;
}

// Get all products with optional filters
export const getProducts = async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const response = await api.get(`/products?${params.toString()}`);
  return response.data;
};

// Get single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Create new product (Admin)
export const createProduct = async (productData: CreateProductRequest, imageFile?: File): Promise<Product> => {
  const formData = new FormData();
  
  // Append all product data
  Object.entries(productData).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });
  
  // Append image file if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update product (Admin)
export const updateProduct = async (id: string, productData: Partial<CreateProductRequest>, imageFile?: File): Promise<Product> => {
  const formData = new FormData();
  
  // Append all product data
  Object.entries(productData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value.toString());
    }
  });
  
  // Append image file if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete product (Admin)
export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Get product categories
export const getProductCategories = async (): Promise<Array<{ name: string; count: number }>> => {
  const response = await api.get('/products/categories');
  return response.data;
};
