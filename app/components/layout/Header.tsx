"use client";

import { Search, Calendar, Bell, User } from 'lucide-react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2 className="page-title">Overview</h2>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search anything..." className="search-input" />
        </div>
      </div>
      
      <div className="header-right">
        <div className="date-picker-btn">
          <Calendar size={18} />
          <span>Jul 2023 - Aug 2023</span>
        </div>
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
