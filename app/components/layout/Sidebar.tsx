"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PieChart, 
  Package, 
  Tag, 
  Boxes, 
  ShoppingCart, 
  LineChart, 
  Users, 
  Mail, 
  Settings,
  Hexagon
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: PieChart },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Offers', path: '/offers', icon: Tag },
  { name: 'Inventory', path: '/inventory', icon: Boxes },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Sales', path: '/sales', icon: LineChart },
  { name: 'Customer', path: '/customers', icon: Users },
  { name: 'Newsletter', path: '/newsletter', icon: Mail },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src="/logo.png" alt="ESHOP Logo" className="brand-icon" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        <span className="brand-name"><b>ESHOP</b></span>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/');
            return (
              <li key={item.path}>
                <Link href={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon size={20} className="nav-icon" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
