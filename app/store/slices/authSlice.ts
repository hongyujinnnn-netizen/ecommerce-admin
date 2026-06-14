import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; role: string } | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
};

export const login = createAsyncThunk('auth/login', async () => {
  return new Promise<{ name: string; role: string }>((resolve) => 
    setTimeout(() => resolve({ name: 'Admin User', role: 'Super Admin' }), 800)
  );
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return new Promise<void>((resolve) => setTimeout(resolve, 300));
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;
