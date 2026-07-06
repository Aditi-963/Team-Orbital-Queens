import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Map,
  Sprout,
  BarChart3,
  Droplets,
  Bell,
  CloudSun,
  FileText,
  HeartHandshake,
  Coins,
  Settings,
  Crown
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { t, alerts } = useApp();
  const activeAlertsCount = alerts.filter((a) => !a.resolved).length;

  const menuItems = [
    { name: t('dashboard') || 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: t('satelliteMap') || 'Farm Map', path: '/map', icon: <Map size={18} /> },
    { name: 'Crops', path: '/farm-details', icon: <Sprout size={18} /> },
    { name: 'Analytics', path: '/predictions', icon: <BarChart3 size={18} /> },
    { name: t('irrigation') || 'Irrigation', path: '/irrigation', icon: <Droplets size={18} /> },
    { name: 'Alerts', path: '/alerts', icon: <Bell size={18} />, badge: activeAlertsCount > 0 ? activeAlertsCount : undefined },
    { name: 'Weather', path: '/weather', icon: <CloudSun size={18} /> },
    { name: t('reports') || 'Reports', path: '/reports', icon: <FileText size={18} /> },
    { name: 'Advisory', path: '/advisory', icon: <HeartHandshake size={18} /> },
    { name: 'Market Prices', path: '/market-prices', icon: <Coins size={18} /> },
    { name: t('settings') || 'Settings', path: '/settings', icon: <Settings size={18} /> }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 flex-shrink-0 z-40">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-200 flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center text-green-600 border border-green-200">
            <Sprout size={20} className="text-green-600 font-extrabold" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-none tracking-tight text-slate-800 flex items-center gap-1">
              <span>CropOrbit</span>
              <span className="text-slate-500 font-semibold">AI</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 block">Precision Farming</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-2">
          Precision Farming Powered From Space
        </p>
      </div>

      {/* Navigation Menu Links */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                isActive
                  ? 'bg-green-100/60 text-green-800 border-green-200/50 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 bg-transparent border-transparent hover:bg-slate-50'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <span className={item.name === 'Dashboard' ? 'text-green-600' : 'text-slate-500'}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
            {item.badge && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[18px]">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Upgrade to Premium Card */}
      <div className="p-4 border-t border-slate-200">
        <div className="p-4 rounded-2xl bg-green-50 border border-green-100 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600">
              <Crown size={16} />
            </div>
            <span className="text-xs font-bold text-slate-800">Upgrade to Premium</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Unlock advanced analytics, detailed reports and more.
          </p>
          <button className="w-full py-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
