import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface DashboardState {
  revenue: number;
  revenueChange: number;
  orders: number;
  ordersChange: number;
  customers: number;
  customersChange: number;
  pendingOrders: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DashboardState = {
  revenue: 0,
  revenueChange: 0,
  orders: 0,
  ordersChange: 0,
  customers: 0,
  customersChange: 0,
  pendingOrders: 0,
  status: 'idle',
};

// Mock async thunk
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    return new Promise<{
      revenue: number;
      revenueChange: number;
      orders: number;
      ordersChange: number;
      customers: number;
      customersChange: number;
      pendingOrders: number;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          revenue: 82650,
          revenueChange: 11,
          orders: 1645,
          ordersChange: 11,
          customers: 1462,
          customersChange: -17,
          pendingOrders: 114,
        });
      }, 500);
    });
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.revenue = action.payload.revenue;
        state.revenueChange = action.payload.revenueChange;
        state.orders = action.payload.orders;
        state.ordersChange = action.payload.ordersChange;
        state.customers = action.payload.customers;
        state.customersChange = action.payload.customersChange;
        state.pendingOrders = action.payload.pendingOrders;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default dashboardSlice.reducer;
