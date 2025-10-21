import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  pricePerCase: number;
  unit: string;
  packSize: string;
  image: string;
  description?: string;
  inStock: boolean;
  isFeatured: boolean;
  isOnOffer: boolean;
  brand?: string;
  sku?: string;
}

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  isLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  selectedCategory: null,
  searchQuery: '',
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.isLoading = false;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.filteredItems = action.payload
        ? state.items.filter((item) => item.category === action.payload)
        : state.items;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.items.filter((item) =>
        item.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProducts, setCategory, setSearchQuery, setLoading } = productsSlice.actions;
export default productsSlice.reducer;
