import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

interface OrderState {
  items: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: OrderState = {
  items: [],
  status: 'idle',
};

const API_URL = 'http://localhost:8080/api/orders';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await response.json();
  return data.map((item: any) => ({
    id: String(item.id),
    // Use billingName if available, else fallback
    customerName: item.billingName || `Customer ${item.id}`,
    date: new Date().toISOString().split('T')[0], // Backend doesn't have a date field currently
    total: item.totalPrice || 0,
    status: item.status || 'Pending',
  }));
});

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }: { id: string; status: Order['status'] }) => {
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update status');
    }
    const data = await response.json();
    return { id: String(data.id), status: data.status as Order['status'] };
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const order = state.items.find(o => o.id === action.payload.id);
        if (order) {
          order.status = action.payload.status;
        }
      });
  },
});

export default orderSlice.reducer;
