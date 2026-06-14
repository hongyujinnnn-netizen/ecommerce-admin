import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    products: productReducer,
    orders: orderReducer,
    auth: authReducer,
    customers: customerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
