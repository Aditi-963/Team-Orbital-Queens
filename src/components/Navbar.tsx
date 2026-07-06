import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Search, Globe, LogOut, User, Radio, Sun } from 'lucide-react';
import { mockWeather } from '../services/mockData';

export const Navbar: React.FC = () => {
  const {
    user,
    logout,
    language,
    setLanguage,
    selectedFarm,
    t,
    alerts,
    resolveAlert
  } = useApp();

  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const activeAlerts = alerts.filter(a => !a.resolved);
  const weather = mockWeather[selectedFarm.id] || mockWeather['farm-1'];

  const languagesList = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'gu', name: 'ગુજરાતી' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/70 backdrop-blur-md border-b border-slate-900 px-6 py-3.5 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative w-64 md:w-96 hidden sm:block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/10 transition-all"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-auto sm:ml-0">
        {/* PWA Satellite Sync Feed */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-cyan-400 text-xs font-semibold">
          <Radio size={14} className="animate-pulse text-cyan-400" />
          <span className="tracking-wide">SAT-FEED: Sentinel-2C ACTIVE</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping ml-1" />
        </div>

        {/* Quick Weather */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-850 text-slate-300 text-xs">
          <Sun size={14} className="text-amber-400 animate-spin [animation-duration:15s]" />
          <span>{weather.temp}°C</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{selectedFarm.name.split(' ')[0]}</span>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLanguageDropdown(!showLanguageDropdown);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Globe size={16} />
            <span className="text-xs uppercase font-semibold hidden sm:inline">{language}</span>
          </button>

          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2.5 w-40 rounded-xl bg-slate-950 border border-slate-800 p-1.5 shadow-2xl z-50">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    language === lang.code
                      ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Alert Notifications Center */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowLanguageDropdown(false);
              setShowProfileMenu(false);
            }}
            className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700 transition-all relative"
          >
            <Bell size={16} />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2.5 w-80 rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-2xl z-50">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-900">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{t('notifications')}</span>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-semibold">
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
                      className={`p-2.5 rounded-xl border text-xs flex flex-col gap-1 ${
                        alert.severity === 'critical'
                          ? 'bg-red-950/10 border-red-900/40 text-red-200'
                          : 'bg-amber-950/10 border-amber-900/40 text-amber-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{alert.farmName}</span>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="text-[10px] underline hover:text-white"
                        >
                          Resolve
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{alert.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowLanguageDropdown(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/60 border border-slate-850 hover:border-slate-700 transition-all"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
              alt="Avatar"
              className="h-7 w-7 rounded-lg object-cover"
            />
            <span className="text-xs font-semibold text-slate-300 hidden md:inline pr-1">
              {user?.name || 'Ramesh Singh'}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2.5 w-48 rounded-xl bg-slate-950 border border-slate-800 p-1.5 shadow-2xl z-50">
              <div className="px-3 py-2 border-b border-slate-900 text-left">
                <p className="text-xs font-bold text-white leading-none">{user?.name || 'Ramesh Singh'}</p>
                <p className="text-[10px] text-slate-500 mt-1 truncate">{user?.email || 'ramesh@farms.com'}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 mt-1.5 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-all text-left"
              >
                <LogOut size={14} />
                <span>{t('logout')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
