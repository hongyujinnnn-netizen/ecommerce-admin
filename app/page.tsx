"use client";

import { useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from './components/layout/AdminLayout';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchDashboardStats } from './store/slices/dashboardSlice';
import './dashboard.css';

const chartData = [
  { name: '22 July', income: 4000, expenses: 2400 },
  { name: '23 July', income: 3000, expenses: 1398 },
  { name: '24 July', income: 2000, expenses: 9800 },
  { name: '25 July', income: 2780, expenses: 3908 },
  { name: '26 July', income: 1890, expenses: 4800 },
  { name: '27 July', income: 2390, expenses: 3800 },
  { name: '28 July', income: 3490, expenses: 4300 },
  { name: '29 July', income: 4000, expenses: 2400 },
];

const topProducts = [
  { id: 1, name: 'Air Jordan 8', stock: '752 Pcs', image: '👟' },
  { id: 2, name: 'Air Jordan 5', stock: '752 Pcs', image: '👟' },
  { id: 3, name: 'Air Jordan 13', stock: '752 Pcs', image: '👟' },
  { id: 4, name: 'Nike Air Max', stock: '752 Pcs', image: '👟' },
  { id: 5, name: 'Nike Dunk Low', stock: '752 Pcs', image: '👟' },
];

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { 
    revenue, revenueChange, 
    orders, ordersChange, 
    customers, customersChange, 
    pendingOrders, status 
  } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboardStats());
    }
  }, [status, dispatch]);

  return (
    <AdminLayout>
      <div className="dashboard-grid">
        <div className="stats-grid">
          <div className="card stat-card">
            <div className="stat-header">
              <span className="stat-title">Total Revenue<br/>Last 30 days</span>
              <div className="stat-icon revenue">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="stat-value-container">
              <span className="stat-value">${revenue.toLocaleString()}</span>
              <span className={`stat-change ${revenueChange >= 0 ? 'positive' : 'negative'}`}>
                {revenueChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(revenueChange)}%
              </span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="stat-header">
              <span className="stat-title">Total Order<br/>Last 30 days</span>
              <div className="stat-icon orders">
                <ShoppingCart size={20} />
              </div>
            </div>
            <div className="stat-value-container">
              <span className="stat-value">{orders.toLocaleString()}</span>
              <span className={`stat-change ${ordersChange >= 0 ? 'positive' : 'negative'}`}>
                {ordersChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(ordersChange)}%
              </span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="stat-header">
              <span className="stat-title">Total Customer<br/>Last 30 days</span>
              <div className="stat-icon customers">
                <Users size={20} />
              </div>
            </div>
            <div className="stat-value-container">
              <span className="stat-value">{customers.toLocaleString()}</span>
              <span className={`stat-change ${customersChange >= 0 ? 'positive' : 'negative'}`}>
                {customersChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(customersChange)}%
              </span>
            </div>
          </div>

          <div className="card stat-card">
            <div className="stat-header">
              <span className="stat-title">Pending Order<br/>Last 30 days</span>
              <div className="stat-icon pending">
                <Clock size={20} />
              </div>
            </div>
            <div className="stat-value-container">
              <span className="stat-value">{pendingOrders}</span>
              <span className="stat-change positive">
                <TrendingUp size={16} />
                5%
              </span>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="card chart-card">
            <div className="chart-header">
              <span className="chart-title">Sales Analytic</span>
              <select className="chart-filter">
                <option>Jul 2023</option>
                <option>Aug 2023</option>
              </select>
            </div>
            
            <div className="sales-summary">
              <div className="sales-item">
                <span className="sales-item-title">Income</span>
                <span className="sales-item-val">23,262.00</span>
              </div>
              <div className="sales-item">
                <span className="sales-item-title">Expenses</span>
                <span className="sales-item-val">11,135.00</span>
              </div>
              <div className="sales-item">
                <span className="sales-item-title">Balance</span>
                <span className="sales-item-val text-primary">48,135.00</span>
              </div>
            </div>

            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38c1a1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#38c1a1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8ba29d' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8ba29d' }} tickFormatter={(val) => `${val/1000}k`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="income" stroke="#38c1a1" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card chart-card">
            <div className="chart-header">
              <span className="chart-title">Sales Target</span>
            </div>
            <div className="target-content">
              {/* Simple placeholder for Donut chart to save time, use CSS circle */}
              <div style={{ width: 140, height: 140, borderRadius: '50%', border: '15px solid #38c1a1', borderTopColor: '#e2edea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>82%</span>
              </div>
              
              <div className="target-details">
                <div className="target-item">
                  <span className="target-label">Daily Target</span>
                  <span className="target-val">
                    <TrendingDown size={16} className="negative" style={{ color: 'var(--danger-color)' }} /> 650
                  </span>
                </div>
                <div className="target-item">
                  <span className="target-label monthly">Monthly Target</span>
                  <span className="target-val">
                    <TrendingUp size={16} className="positive" style={{ color: 'var(--primary-color)' }} /> 145,00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="chart-header">
            <span className="chart-title">Top Selling Products</span>
            <button className="btn btn-outline" style={{ border: 'none', padding: 0 }}>
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="products-grid">
            {topProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <span style={{ fontSize: '4rem' }}>{product.image}</span>
                </div>
                <div className="product-info">
                  <span className="product-name">{product.name}</span>
                  <span className="product-stock">{product.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
