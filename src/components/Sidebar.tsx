import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Map,
  TrendingUp,
  Brain,
  Droplets,
  FileSpreadsheet,
  Settings,
  HelpCircle,
  FolderOpen,
  ChevronDown,
  Globe2,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { farms, selectedFarm, setSelectedFarm, t } = useApp();
  const [showFarmDropdown, setShowFarmDropdown] = useState(false);

  const menuItems = [
    { name: t('dashboard'), path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: t('satelliteMap'), path: '/map', icon: <Map size={18} /> },
    { name: t('cropAnalytics'), path: '/farm-details', icon: <TrendingUp size={18} /> },
    { name: t('predictions'), path: '/predictions', icon: <Brain size={18} /> },
    { name: t('irrigation'), path: '/irrigation', icon: <Droplets size={18} /> },
    { name: t('reports'), path: '/reports', icon: <FileSpreadsheet size={18} /> },
    { name: t('settings'), path: '/settings', icon: <Settings size={18} /> }
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col h-screen sticky top-0 flex-shrink-0 z-40">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-900 flex flex-col gap-1 bg-gradient-to-b from-slate-900/20 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-neon-cyan relative overflow-hidden group">
            <Globe2 size={20} className="animate-pulse text-white group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg leading-none tracking-wider text-white">
              CROP<span className="text-cyan-400">ORBIT</span>
            </h1>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">AI PLATFORM</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-2 italic flex items-center gap-1">
          <Sparkles size={10} className="text-cyan-400" />
          "Precision Farming From Space"
        </p>
      </div>

      {/* Farm Switcher Dropdown */}
      <div className="px-4 py-4 border-b border-slate-900 relative">
        <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1.5 px-2">
          Active Operation
        </label>
        <button
          onClick={() => setShowFarmDropdown(!showFarmDropdown)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-all"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <FolderOpen size={15} className="text-cyan-400 flex-shrink-0" />
            <span className="text-xs font-semibold text-white truncate">{selectedFarm.name}</span>
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${showFarmDropdown ? 'rotate-180' : ''}`} />
        </button>

        {showFarmDropdown && (
          <div className="absolute left-4 right-4 mt-1 bg-slate-950 border border-slate-800 rounded-xl p-1 shadow-2xl z-50 max-h-48 overflow-y-auto">
            {farms.map((farm) => (
              <button
                key={farm.id}
                onClick={() => {
                  setSelectedFarm(farm);
                  setShowFarmDropdown(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedFarm.id === farm.id
                    ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="font-semibold">{farm.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{farm.cropType} • {farm.area} ha</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Menu Links */}
      <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                isActive
                  ? 'bg-gradient-to-tr from-cyan-950/50 to-blue-950/30 text-cyan-400 border-cyan-800/40 shadow-glass'
                  : 'text-slate-400 hover:text-white bg-transparent border-transparent hover:bg-slate-900/40'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Support */}
      <div className="p-4 border-t border-slate-900">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/40 transition-all"
        >
          <HelpCircle size={18} />
          <span>{t('help')}</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
