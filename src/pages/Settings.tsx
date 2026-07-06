import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import {
  User,
  Settings as SettingsIcon,
  Globe,
  Bell,
  Key,
  Info,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const Settings: React.FC = () => {
  const {
    user,
    language,
    setLanguage,
    theme,
    toggleTheme,
    t,
    addPushNotification
  } = useApp();

  const [profileName, setProfileName] = useState(user?.name || 'Ramesh Singh');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'ramesh@farms.com');
  const [apiKey, setApiKey] = useState('sk_live_sentinel2_c8f8b89e2c4d4f8a9e2d');
  const [showApiKey, setShowApiKey] = useState(false);
  const [alertPrefEmail, setAlertPrefEmail] = useState(true);
  const [alertPrefPush, setAlertPrefPush] = useState(true);
  const [alertPrefSms, setAlertPrefSms] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addPushNotification('Profile settings updated successfully', 'success');
  };

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    addPushNotification('Geospatial API configuration saved', 'success');
  };

  const languagesList = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">{t('settings')}</h2>
        <p className="text-xs text-slate-400 mt-1">Configure profile details, satellite key connections, and localized translations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card and Language Selector */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Form */}
          <GlassCard hoverEffect>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <User className="text-cyan-400" size={14} />
                User Profile
              </h3>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
                    Agronomist Name
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
                    Agronomist Email
                  </label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:shadow-neon-cyan text-white font-bold text-xs tracking-wider transition-all"
              >
                Save Profile
              </button>
            </form>
          </GlassCard>

          {/* Regional Settings */}
          <GlassCard hoverEffect>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="text-emerald-400" size={14} />
                Regional & Appearance
              </h3>
            </div>
            <div className="space-y-5">
              {/* Language Selector */}
              <div>
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                  System Language
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        language === lang.code
                          ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/40'
                          : 'bg-slate-900/60 border-slate-850 text-slate-400 hover:text-white hover:border-slate-750'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selector */}
              <div className="border-t border-slate-900/60 pt-4">
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-2">
                  Theme Appearance
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={toggleTheme}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      theme === 'dark'
                        ? 'bg-cyan-950/40 text-cyan-400 border-cyan-800/40'
                        : 'bg-slate-900/60 border-slate-850 text-slate-400'
                    }`}
                  >
                    Dark Space (Default)
                  </button>
                  <button
                    onClick={toggleTheme}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      theme === 'light'
                        ? 'bg-cyan-550/20 text-cyan-550 border-cyan-500/30'
                        : 'bg-slate-900/60 border-slate-850 text-slate-400'
                    }`}
                  >
                    Sleek Light Mode
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* API keys and Notifications preference */}
        <div className="space-y-6">
          {/* API keys card */}
          <GlassCard hoverEffect>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Key className="text-amber-400" size={14} />
                API Integration
              </h3>
            </div>
            <form onSubmit={handleSaveApiKeys} className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
                  Sentinel-Hub Credential Token
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs tracking-wider transition-all"
              >
                Link Token
              </button>
            </form>
          </GlassCard>

          {/* Notifications Card */}
          <GlassCard hoverEffect>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="text-blue-400" size={14} />
                Alert Preferences
              </h3>
            </div>
            <div className="space-y-3.5 text-xs">
              <label className="flex items-center gap-3 cursor-pointer select-none text-slate-400">
                <input
                  type="checkbox"
                  checked={alertPrefEmail}
                  onChange={(e) => setAlertPrefEmail(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0 h-4 w-4"
                />
                <span>Email summaries (Weekly)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none text-slate-400">
                <input
                  type="checkbox"
                  checked={alertPrefPush}
                  onChange={(e) => setAlertPrefPush(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0 h-4 w-4"
                />
                <span>Push notifications (Immediate)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer select-none text-slate-400">
                <input
                  type="checkbox"
                  checked={alertPrefSms}
                  onChange={(e) => setAlertPrefSms(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0 h-4 w-4"
                />
                <span>SMS Alert notifications</span>
              </label>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* About Box */}
      <GlassCard hoverEffect>
        <div className="border-b border-slate-900 pb-3 mb-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Info className="text-purple-400" size={14} />
            About CropOrbit AI
          </h3>
        </div>
        <div className="text-xs text-slate-400 leading-relaxed space-y-2 max-w-2xl">
          <p>
            CropOrbit AI is a full-scale digital agricultural platform conceptualized for the ISRO BAH 2026 Hackathon.
          </p>
          <p>
            This software builds on NASA Earth Observatory, Landsat-9, and Sentinel-2 electromagnetic band layers, processing surface reflectance metrics to calculate soil hydration, vegetation density, and crop yield parameters.
          </p>
          <p className="font-bold text-slate-500">Version 1.0.0 (Build 2026-07-04)</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Settings;
