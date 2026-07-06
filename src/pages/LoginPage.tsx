import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/GlassCard';
import { Globe, Lock, Mail, Github, LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || 'ramesh@farms.com', name || 'Ramesh Singh');
    navigate('/dashboard');
  };

  const handleSsoClick = (provider: string) => {
    login(`${provider.toLowerCase()}@croporbit.ai`, `Demo ${provider} Commander`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 space-gradient relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Star field decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] animate-twinkle" />

      {/* Earth glow background effect */}
      <div className="absolute -left-40 -bottom-40 w-96 h-96 rounded-full bg-cyan-500/10 earth-glow border border-cyan-500/5 pointer-events-none" />

      <GlassCard className="w-full max-w-md p-8 relative z-10 border border-slate-800/80 shadow-2xl">
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-neon-cyan mb-4">
            <Globe size={24} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-wider">
            CROP<span className="text-cyan-400">ORBIT</span> AI
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-medium">Precision Farming Powered From Space</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
              Full Name (Optional)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Singh"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ramesh@farms.com"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block mb-1">
              Secret Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Remember and Forgot */}
          <div className="flex justify-between items-center text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-900 border-slate-800 text-cyan-500 focus:ring-0 focus:ring-offset-0 h-4 w-4"
              />
              <span>Remember Me</span>
            </label>
            <button type="button" className="text-cyan-400 font-semibold hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 hover:shadow-neon-cyan hover:scale-[1.01] active:scale-[0.99] text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={15} />
            <span>AUTHORIZE & LOG IN</span>
          </button>
        </form>

        {/* Separator */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-900 w-full" />
          <span className="absolute bg-slate-950 px-3 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            OR SINGLE SIGN-ON
          </span>
        </div>

        {/* SSO button grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSsoClick('Google')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-900/80 hover:border-slate-700 text-slate-350 text-xs font-semibold transition-all"
          >
            {/* Google logo representation */}
            <span className="h-4 w-4 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-extrabold flex items-center justify-center rounded">G</span>
            <span>Google SSO</span>
          </button>
          <button
            onClick={() => handleSsoClick('GitHub')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-850 hover:bg-slate-900/80 hover:border-slate-700 text-slate-350 text-xs font-semibold transition-all"
          >
            <Github size={14} className="text-white" />
            <span>GitHub SSO</span>
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default LoginPage;
