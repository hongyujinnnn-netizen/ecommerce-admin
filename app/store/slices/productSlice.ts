import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'Active' | 'Draft';
  image: string;
}

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
};

const API_URL = 'http://localhost:8080/api/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  
  // The backend returns a paginated response, so the products are in data.content
  const productsArray = data.content ? data.content : data;

  // Map backend data to frontend model (adding defaults for missing fields)
  return productsArray.map((item: any) => ({
    id: String(item.id),
    name: item.name,
    price: item.price,
    stock: item.stock || 0, // Fallback if backend doesn't have it
    category: item.category?.name || item.category || 'General',
    status: item.status || 'Active',
    image: item.image || '👟',
  }));
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: Omit<Product, 'id'>) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: product.name,
      price: product.price,
      image: product.image,
      // Pass other fields if backend supports them later
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add product');
  }
  
  const data = await response.json();
  return {
    ...product,
    id: String(data.id),
  };
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;
