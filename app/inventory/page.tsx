"use client";

import { AlertTriangle, Download, RefreshCw } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import '../products/page.css'; // Reusing table styles
import './inventory.css';

const mockInventory = [
  { id: 'SKU-001', name: 'Air Jordan 8', location: 'Warehouse A', stock: 752, incoming: 100, status: 'Healthy' },
  { id: 'SKU-002', name: 'Air Jordan 5', location: 'Warehouse B', stock: 12, incoming: 50, status: 'Low Stock' },
  { id: 'SKU-003', name: 'Air Jordan 13', location: 'Warehouse A', stock: 450, incoming: 0, status: 'Healthy' },
  { id: 'SKU-004', name: 'Nike Air Max', location: 'Warehouse C', stock: 0, incoming: 200, status: 'Out of Stock' },
  { id: 'SKU-005', name: 'Nike Dunk Low', location: 'Warehouse A', stock: 89, incoming: 0, status: 'Healthy' },
];

export default function InventoryPage() {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Inventory Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">
            <Download size={18} />
            Export
          </button>
          <button className="btn btn-primary">
            <RefreshCw size={18} />
            Sync Stock
          </button>
        </div>
      </div>

      <div className="alert-banner warning">
        <div className="alert-icon">
          <AlertTriangle size={20} />
        </div>
        <div className="alert-content">
          <h4>Low Stock Alert</h4>
          <p>You have 2 products that are running low or out of stock. Please reorder soon.</p>
        </div>
      </div>

      <div className="card table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Location</th>
              <th>Current Stock</th>
              <th>Incoming</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockInventory.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{item.id}</td>
                <td style={{ fontWeight: 600 }}>{item.name}</td>
                <td>{item.location}</td>
                <td style={{ fontWeight: 700 }}>{item.stock}</td>
                <td>{item.incoming > 0 ? `+${item.incoming}` : '-'}</td>
                <td>
                  <span className={`status-badge ${item.status.toLowerCase().replace(/ /g, '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    Reorder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
