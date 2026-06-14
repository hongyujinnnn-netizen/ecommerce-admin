"use client";

import { Send, Users, MousePointer2, Eye } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import './newsletter.css';

const recentCampaigns = [
  { id: 1, title: 'Summer Sale Announcment', sentDate: 'Jul 20, 2023', recipients: 12500, openRate: '45.2%', clickRate: '12.4%', status: 'Sent' },
  { id: 2, title: 'Welcome Series - Email 1', sentDate: 'Automated', recipients: 3400, openRate: '68.5%', clickRate: '22.1%', status: 'Active' },
  { id: 3, title: 'Back to School Prep', sentDate: 'Aug 05, 2023', recipients: 15000, openRate: '-', clickRate: '-', status: 'Draft' },
];

export default function NewsletterPage() {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Newsletter & Campaigns</h1>
        <button className="btn btn-primary">
          <Send size={18} />
          Compose Campaign
        </button>
      </div>

      <div className="analytics-stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="card stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Subscribers</span>
            <div className="stat-icon" style={{ backgroundColor: 'rgba(56, 193, 161, 0.15)', color: 'var(--primary-color)' }}><Users size={20} /></div>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">24,850</span>
            <span className="stat-change positive">+2.4%</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-header">
            <span className="stat-title">Avg. Open Rate</span>
            <div className="stat-icon" style={{ backgroundColor: 'rgba(74, 144, 226, 0.15)', color: '#4a90e2' }}><Eye size={20} /></div>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">38.4%</span>
            <span className="stat-change positive">+1.2%</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-header">
            <span className="stat-title">Avg. Click Rate</span>
            <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 166, 35, 0.15)', color: '#f5a623' }}><MousePointer2 size={20} /></div>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">9.2%</span>
            <span className="stat-change negative">-0.4%</span>
          </div>
        </div>
      </div>

      <div className="card table-container">
        <h3 style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>Recent Campaigns</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Sent Date</th>
              <th>Recipients</th>
              <th>Open Rate</th>
              <th>Click Rate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentCampaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td style={{ fontWeight: 600 }}>{campaign.title}</td>
                <td>{campaign.sentDate}</td>
                <td>{campaign.recipients.toLocaleString()}</td>
                <td style={{ fontWeight: 500 }}>{campaign.openRate}</td>
                <td style={{ fontWeight: 500 }}>{campaign.clickRate}</td>
                <td>
                  <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                    {campaign.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    View Report
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
