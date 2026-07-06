import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Search, LogOut, ChevronDown, CloudSun } from 'lucide-react';
import { mockWeather } from '../services/mockData';

export const Navbar: React.FC = () => {
  const {
    user,
    logout,
    selectedFarm,
    t,
    alerts,
    resolveAlert
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const activeAlerts = alerts.filter(a => !a.resolved);
  const weather = mockWeather[selectedFarm.id] || mockWeather['farm-1'];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 px-8 py-3.5 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative w-64 md:w-96 hidden sm:block">
        <input
          type="text"
          placeholder={t('searchPlaceholder') || 'Search farms, fields, locations...'}
          className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-10 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/10 transition-all font-medium"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
          <Search size={16} />
        </span>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6 ml-auto sm:ml-0">
        
        {/* Alert Notifications Center */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all relative"
          >
            <Bell size={20} />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {activeAlerts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white border border-slate-250 p-4 shadow-xl z-50">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Alert Center</span>
                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                  {activeAlerts.length} Active
                </span>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {activeAlerts.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No active anomalies detected.</p>
                ) : (
                  activeAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 ${
                        alert.severity === 'critical'
                          ? 'bg-red-50 border-red-200 text-red-800'
                          : 'bg-amber-50 border-amber-200 text-amber-800'
                      }`}
                    >
                      <div className="flex justify-between items-center font-bold">
                        <span>{alert.farmName}</span>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="text-[10px] underline hover:text-slate-900"
                        >
                          Resolve
                        </button>
                      </div>
                      <p className="text-[11px] leading-relaxed">{alert.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Weather */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <CloudSun size={20} className="text-amber-500" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800">{weather.temp || 28}°C</span>
            <span className="text-[10px] text-slate-400 font-semibold leading-tight">Partly Cloudy</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 text-left p-1 rounded-xl transition-all"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
              alt="Avatar"
              className="h-9 w-9 rounded-full object-cover border border-slate-200 shadow-sm"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-extrabold text-slate-800">
                Hi, {user?.name || 'Farmer'}!
              </span>
              <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-0.5">
                Premium Plan
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400 hidden md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-xl bg-white border border-slate-200 p-1.5 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-slate-100 text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">{user?.name || 'Farmer'}</p>
                <p className="text-[10px] text-slate-500 mt-1 truncate">{user?.email || 'farmer@croporbit.ai'}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 mt-1 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all text-left"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
