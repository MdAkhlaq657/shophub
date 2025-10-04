import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, RecentlyViewedState } from '@/types';

const initialState: RecentlyViewedState = {
  products: [],
};

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addToRecentlyViewed: (state, action: PayloadAction<Product>) => {
      const exists = state.products.findIndex(p => p.id === action.payload.id);
      
      if (exists !== -1) {
        state.products.splice(exists, 1);
      }
      
      state.products.unshift(action.payload);
      
      if (state.products.length > 10) {
        state.products = state.products.slice(0, 10);
      }
    },
    clearRecentlyViewed: (state) => {
      state.products = [];
    },
  },
});

export const { addToRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;