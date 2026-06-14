"use client";

import { useEffect } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchOrders, updateOrderStatus, Order } from '../store/slices/orderSlice';
import '../products/page.css'; // Reusing table styles
import './orders.css';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  const handleStatusChange = (id: string, newStatus: Order['status']) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
      </div>

      <div className="card table-container">
        {status === 'loading' ? (
          <div className="loading">Loading orders...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600 }}>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.date}</td>
                  <td style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="status-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
              {items.length === 0 && status !== 'loading' && (
                <tr>
                  <td colSpan={6} className="text-center">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
