"use client";

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, MousePointer2, Clock, Activity } from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';
import './analytics.css';

const trafficData = [
  { name: 'Organic', value: 4000, color: '#38c1a1' },
  { name: 'Direct', value: 3000, color: '#4a90e2' },
  { name: 'Social', value: 2000, color: '#f5a623' },
  { name: 'Referral', value: 1000, color: '#9013fe' },
];

const conversionData = [
  { name: 'Visitors', count: 12000 },
  { name: 'Add to Cart', count: 3000 },
  { name: 'Checkout', count: 1500 },
  { name: 'Purchased', count: 800 },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Analytics Overview</h1>
        <select className="input" style={{ width: 'auto', padding: '0.4rem 1rem' }}>
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="analytics-stats-grid">
        <div className="card stat-card">
          <div className="stat-header">
            <span className="stat-title">Total Visitors</span>
            <div className="stat-icon" style={{ backgroundColor: 'rgba(74, 144, 226, 0.15)', color: '#4a90e2' }}><Users size={20} /></div>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">12,450</span>
            <span className="stat-change positive">+15%</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-header">
            <span className="stat-title">Bounce Rate</span>
            <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 82, 82, 0.15)', color: 'var(--danger-color)' }}><Activity size={20} /></div>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">42.3%</span>
            <span className="stat-change negative">-2.1%</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-header">
            <span className="stat-title">Avg. Session</span>
            <div className="stat-icon" style={{ backgroundColor: 'rgba(56, 193, 161, 0.15)', color: 'var(--primary-color)' }}><Clock size={20} /></div>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">3m 45s</span>
            <span className="stat-change positive">+12s</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-header">
            <span className="stat-title">Click Rate</span>
            <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 166, 35, 0.15)', color: '#f5a623' }}><MousePointer2 size={20} /></div>
          </div>
          <div className="stat-value-container">
            <span className="stat-value">8.4%</span>
            <span className="stat-change positive">+0.8%</span>
          </div>
        </div>
      </div>

      <div className="analytics-charts-grid">
        <div className="card chart-card">
          <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}>Traffic Sources</h3>
          <div style={{ width: '100%', height: 300, display: 'flex' }}>
            <ResponsiveContainer width="60%">
              <RechartsPieChart>
                <Pie data={trafficData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="traffic-legend">
              {trafficData.map(item => (
                <div key={item.name} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card chart-card">
          <h3 className="chart-title" style={{ marginBottom: '1.5rem' }}>Conversion Funnel</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={conversionData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2edea" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#8ba29d', fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: 'rgba(56, 193, 161, 0.05)' }} />
                <Bar dataKey="count" fill="var(--primary-color)" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
