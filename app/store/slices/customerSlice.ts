import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  spend: number;
  orders: number;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'VIP';
}

interface CustomerState {
  items: Customer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CustomerState = {
  items: [],
  status: 'idle',
};

const API_URL = 'http://localhost:8080/api/users';

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch customers');
  }
  const data = await response.json();
  return data.map((item: any) => ({
    id: `CUS-${String(item.id).padStart(3, '0')}`,
    name: item.name,
    email: item.email,
    // Provide sensible defaults for fields the backend User entity doesn't have yet
    phone: item.phone || '(555) 000-0000',
    spend: Math.floor(Math.random() * 5000), 
    orders: Math.floor(Math.random() * 50),
    joinDate: new Date().toISOString().split('T')[0],
    status: item.status || 'Active',
  }));
});

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default customerSlice.reducer;
