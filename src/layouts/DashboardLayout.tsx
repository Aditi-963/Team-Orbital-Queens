import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import AiCopilot from '../components/AiCopilot';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated, pushNotifications, removePushNotification } = useApp();

  // Redirect to landing page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-emerald-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-400" />;
      case 'info':
      default:
        return <Info size={16} className="text-cyan-400" />;
    }
  };

  const getNotificationBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200';
      case 'warning':
        return 'border-amber-500/30 bg-amber-950/20 text-amber-200';
      case 'info':
      default:
        return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950/40 p-6">
          <Outlet />
        </main>
      </div>

      {/* Floating AI Copilot Chatbot */}
      <AiCopilot />

      {/* Push Notification Overlay Banners */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {pushNotifications.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`p-4 rounded-xl border backdrop-blur-md shadow-2xl flex gap-3 items-start pointer-events-auto ${getNotificationBorderColor(
                note.type
              )}`}
            >
              <div className="mt-0.5">{getNotificationIcon(note.type)}</div>
              <div className="flex-1 text-xs font-medium leading-relaxed">
                {note.message}
              </div>
              <button
                onClick={() => removePushNotification(note.id)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardLayout;
