"use client";

import { useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../components/layout/AdminLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, deleteProduct } from '../store/slices/productSlice';
import './page.css';

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Products</h1>
        <Link href="/products/edit" className="btn btn-primary">
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="card table-container">
        {status === 'loading' ? (
          <div className="loading">Loading products...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-img-sm">
                        {product.image?.startsWith('data:image') || product.image?.startsWith('http') ? (
                           <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                           product.image
                        )}
                      </div>
                      <span className="product-name-tbl">{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span className={`status-badge ${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="action-btn edit" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button 
                        className="action-btn delete" 
                        title="Delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && status !== 'loading' && (
                <tr>
                  <td colSpan={6} className="text-center">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
