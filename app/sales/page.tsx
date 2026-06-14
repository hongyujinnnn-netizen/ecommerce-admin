"use client";

import { Download, Filter, Calendar } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import '../products/page.css';
import './sales.css';

const mockSales = [
  { id: 'INV-2023-001', date: 'Jul 22, 2023', customer: 'John Doe', amount: 190.00, status: 'Paid', payment: 'Credit Card' },
  { id: 'INV-2023-002', date: 'Jul 23, 2023', customer: 'Jane Smith', amount: 410.00, status: 'Paid', payment: 'PayPal' },
  { id: 'INV-2023-003', date: 'Jul 24, 2023', customer: 'Alice Johnson', amount: 210.00, status: 'Refunded', payment: 'Credit Card' },
  { id: 'INV-2023-004', date: 'Jul 25, 2023', customer: 'Bob Brown', amount: 590.00, status: 'Paid', payment: 'Apple Pay' },
  { id: 'INV-2023-005', date: 'Jul 26, 2023', customer: 'Charlie Davis', amount: 120.00, status: 'Pending', payment: 'Bank Transfer' },
];

export default function SalesPage() {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Sales History</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">
            <Filter size={18} />
            Filter
          </button>
          <button className="btn btn-outline">
            <Calendar size={18} />
            This Month
          </button>
          <button className="btn btn-primary">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="sales-summary-cards">
        <div className="card summary-card">
          <span className="summary-title">Gross Volume</span>
          <span className="summary-val">$82,650.00</span>
        </div>
        <div className="summary-divider"></div>
        <div className="card summary-card">
          <span className="summary-title">Net Volume</span>
          <span className="summary-val">$68,230.00</span>
        </div>
        <div className="summary-divider"></div>
        <div className="card summary-card">
          <span className="summary-title">Refunds</span>
          <span className="summary-val" style={{ color: 'var(--danger-color)' }}>-$1,240.00</span>
        </div>
      </div>

      <div className="card table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Payment Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mockSales.map((sale) => (
              <tr key={sale.id}>
                <td style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{sale.id}</td>
                <td>{sale.date}</td>
                <td style={{ fontWeight: 500 }}>{sale.customer}</td>
                <td>{sale.payment}</td>
                <td style={{ fontWeight: 700 }}>${sale.amount.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${sale.status.toLowerCase()}`}>
                    {sale.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }} title="Download Invoice">
                    <Download size={16} />
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
