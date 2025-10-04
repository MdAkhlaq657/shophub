import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';
import wishlistReducer from './features/wishlistSlice';
import authReducer from './features/authSlice';
import comparisonReducer from './features/comparisonSlice';
import recentlyViewedReducer from './features/recentlyViewedSlice';
import themeReducer from './features/themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    comparison: comparisonReducer,
    recentlyViewed: recentlyViewedReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;