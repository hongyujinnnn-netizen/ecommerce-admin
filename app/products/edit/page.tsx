"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../../components/layout/AdminLayout';
import { useAppDispatch } from '../../store/hooks';
import { addProduct } from '../../store/slices/productSlice';
import './edit.css';

export default function EditProductPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Shoes',
    status: 'Active',
  });
  
  // State to hold the base64 string of the uploaded image
  const [imageBase64, setImageBase64] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result contains the base64 data URL
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageBase64('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct({
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      status: formData.status as 'Active' | 'Draft',
      image: imageBase64 || '👟', // use the base64 string, or fallback if none selected
    }));
    router.push('/products');
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/products" className="btn btn-outline" style={{ padding: '0.5rem' }}>
            <ArrowLeft size={18} />
          </Link>
          <h1 className="page-title">Add New Product</h1>
        </div>
      </div>

      <div className="edit-container">
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Basic Information</h3>
            
            <div className="form-group">
              <label>Product Name</label>
              <input 
                type="text" 
                className="input" 
                placeholder="e.g. Air Jordan 1" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  className="input" 
                  placeholder="0.00" 
                  required
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input 
                  type="number" 
                  className="input" 
                  placeholder="0" 
                  required
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="input"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Shoes</option>
                  <option>Clothing</option>
                  <option>Accessories</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  className="input"
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value})}
                >
                  <option>Active</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>
        </form>

        <div className="edit-sidebar">
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Product Image</h3>
            
            {imageBase64 ? (
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src={imageBase64} alt="Preview" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <button 
                  onClick={removeImage}
                  style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div 
                className="image-upload-area" 
                onClick={() => fileInputRef.current?.click()}
                style={{ cursor: 'pointer' }}
              >
                <Upload size={32} color="var(--text-muted)" />
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Click to select an image
                </p>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  style={{ display: 'none' }} 
                />
              </div>
            )}
          </div>

          <div className="card" style={{ marginTop: '1.5rem' }}>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSubmit}>
              <Save size={18} /> Save Product
            </button>
            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} onClick={() => router.push('/products')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
