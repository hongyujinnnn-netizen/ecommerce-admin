"use client";

import { Plus, Tag, Copy, MoreVertical } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import './offers.css';

const mockOffers = [
  { id: 1, code: 'SUMMER2023', discount: '20% OFF', type: 'Percentage', uses: 342, revenue: 12500, expiry: 'Aug 31, 2023', status: 'Active' },
  { id: 2, code: 'FREESHIP50', discount: 'Free Shipping', type: 'Shipping', uses: 890, revenue: 45000, expiry: 'Dec 31, 2023', status: 'Active' },
  { id: 3, code: 'WELCOME10', discount: '$10 OFF', type: 'Fixed Amount', uses: 124, revenue: 3200, expiry: 'No Expiry', status: 'Active' },
  { id: 4, code: 'FLASH50', discount: '50% OFF', type: 'Percentage', uses: 1250, revenue: 35000, expiry: 'Jul 04, 2023', status: 'Expired' },
];

export default function OffersPage() {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Discount Offers</h1>
        <button className="btn btn-primary">
          <Plus size={18} />
          Create Offer
        </button>
      </div>

      <div className="offers-grid">
        {mockOffers.map((offer) => (
          <div key={offer.id} className="card offer-card">
            <div className="offer-header">
              <div className="offer-icon">
                <Tag size={20} color="var(--primary-color)" />
              </div>
              <span className={`status-badge ${offer.status.toLowerCase()}`}>{offer.status}</span>
              <button className="action-btn" style={{ marginLeft: 'auto' }}>
                <MoreVertical size={18} />
              </button>
            </div>
            
            <div className="offer-code-container">
              <h2 className="offer-code">{offer.code}</h2>
              <button className="copy-btn" title="Copy code"><Copy size={14} /></button>
            </div>
            
            <p className="offer-discount">{offer.discount} <span>• {offer.type}</span></p>
            
            <div className="offer-stats">
              <div className="offer-stat-item">
                <span className="offer-stat-label">Total Uses</span>
                <span className="offer-stat-val">{offer.uses}</span>
              </div>
              <div className="offer-stat-item">
                <span className="offer-stat-label">Revenue</span>
                <span className="offer-stat-val">${offer.revenue.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="offer-footer">
              <span className="offer-expiry">Expires: {offer.expiry}</span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
