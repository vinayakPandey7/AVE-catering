import api from '../../api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  businessName?: string;
  phone?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  businessName?: string;
  phone?: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

// Login user
export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// Register user
export const registerUser = async (userData: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Get user profile
export const getUserProfile = async (): Promise<User> => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Get all users (Admin only)
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

// Set auth token in headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
