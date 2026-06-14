"use client";

import { useEffect } from 'react';
import { User, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchCustomers } from '../store/slices/customerSlice';
import AdminLayout from '../components/layout/AdminLayout';
import '../products/page.css';

export default function CustomersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: customers, status } = useSelector((state: RootState) => state.customers);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCustomers());
    }
  }, [status, dispatch]);

  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Customers</h1>
        <div className="search-bar" style={{ maxWidth: '300px', margin: 0 }}>
          <input type="text" placeholder="Search customers..." className="search-input" />
        </div>
      </div>

      <div className="card table-container">
        {status === 'loading' ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading customers...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact Info</th>
                <th>Total Spend</th>
                <th>Orders</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-img-sm" style={{ borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <div className="product-name-tbl">{customer.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{customer.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Mail size={14} color="var(--text-muted)" /> {customer.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Phone size={14} color="var(--text-muted)" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>${customer.spend.toFixed(2)}</td>
                  <td>{customer.orders}</td>
                  <td>{customer.joinDate}</td>
                  <td>
                    <span className={`status-badge ${customer.status.toLowerCase()}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" title="More options">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
