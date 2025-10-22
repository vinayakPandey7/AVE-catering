import api from '../../api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imagePublicId?: string;
  parentCategory?: string;
  subcategories?: Category[];
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  parentCategoryId?: string;
  displayOrder?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  isActive?: boolean;
}

// Get all categories with hierarchical structure
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

// Get category tree structure
export const getCategoryTree = async (): Promise<Category[]> => {
  const response = await api.get('/categories/tree');
  return response.data;
};

// Get category by slug
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await api.get(`/categories/${slug}`);
  return response.data;
};

// Create new category (Admin)
export const createCategory = async (categoryData: CreateCategoryRequest, imageFile?: File): Promise<Category> => {
  const formData = new FormData();
  
  // Append all category data
  Object.entries(categoryData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value.toString());
    }
  });
  
  // Append image file if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await api.post('/categories/admin/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Update category (Admin)
export const updateCategory = async (id: string, categoryData: UpdateCategoryRequest, imageFile?: File): Promise<Category> => {
  const formData = new FormData();
  
  // Append all category data
  Object.entries(categoryData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value.toString());
    }
  });
  
  // Append image file if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await api.put(`/categories/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Delete category (Admin)
export const deleteCategory = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/categories/admin/${id}`);
  return response.data;
};
