import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderState } from '@/types';

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find(o => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
});

export const { addOrder, updateOrderStatus, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;