"use client";

import { Save, Shield, CreditCard, Bell, Truck, Globe } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import './settings.css';

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Store Settings</h1>
        <button className="btn btn-primary">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="settings-container">
        <div className="card settings-sidebar">
          <ul className="settings-nav">
            <li className="settings-nav-item active">
              <Globe size={18} /> General
            </li>
            <li className="settings-nav-item">
              <CreditCard size={18} /> Payments
            </li>
            <li className="settings-nav-item">
              <Truck size={18} /> Shipping
            </li>
            <li className="settings-nav-item">
              <Bell size={18} /> Notifications
            </li>
            <li className="settings-nav-item">
              <Shield size={18} /> Team & Security
            </li>
          </ul>
        </div>

        <div className="settings-content">
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>General Information</h3>
            
            <div className="form-group">
              <label>Store Name</label>
              <input type="text" className="input" defaultValue="Pixel Commerce" />
            </div>

            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" className="input" defaultValue="support@pixelcommerce.com" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" className="input" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="form-group">
                <label>Store Currency</label>
                <select className="input" defaultValue="USD">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>Store Address</h3>

            <div className="form-group">
              <label>Street Address</label>
              <input type="text" className="input" defaultValue="123 Commerce St, Suite 400" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" className="input" defaultValue="San Francisco" />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" className="input" defaultValue="94105" />
              </div>
            </div>
            
            <div className="form-group">
              <label>Country</label>
              <select className="input" defaultValue="US">
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
