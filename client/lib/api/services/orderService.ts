import api from '../../api';

export interface OrderItem {
  _id?: string;
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  packSize: string;
  unit: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  _id: string;
  orderItems: OrderItem[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

// Create new order
export const createOrder = async (orderData: CreateOrderRequest): Promise<Order> => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Get order by ID
export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Get all orders (Admin)
export const getAllOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');
  return response.data;
};

// Get user's orders
export const getUserOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders/user');
  return response.data;
};
