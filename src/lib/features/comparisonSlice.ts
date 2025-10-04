import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ComparisonState } from '@/types';

const initialState: ComparisonState = {
  products: [],
};

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addToComparison: (state, action: PayloadAction<Product>) => {
      if (state.products.length < 4) {
        const exists = state.products.find(p => p.id === action.payload.id);
        if (!exists) {
          state.products.push(action.payload);
        }
      }
    },
    removeFromComparison: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    clearComparison: (state) => {
      state.products = [];
    },
  },
});

export const { addToComparison, removeFromComparison, clearComparison } = comparisonSlice.actions;
export default comparisonSlice.reducer;