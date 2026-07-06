import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/GlassCard';
import {
  Satellite,
  Cpu,
  Workflow,
  LineChart,
  Shield,
  Activity,
  Layers,
  Database,
  ArrowRight,
  Play,
  Github,
  Globe,
  Sparkles,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, t } = useApp();
  const [showVideoModal, setShowVideoModal] = useState(false);

  const stats = [
    { value: '92%', label: t('cropAccuracy') },
    { value: '88%', label: t('stressAccuracy') },
    { value: '85%', label: t('growthAccuracy') },
    { value: '0', label: t('zeroHardware'), isZero: true }
  ];

  const features = [
    {
      title: t('cropType'),
      desc: 'Hyper-spectral classification maps individual crop profiles directly from space.',
      icon: <Layers className="text-cyan-400" size={24} />
    },
    {
      title: t('moistureStress'),
      desc: 'SWIR (Short-Wave Infrared) band scans track moisture depletion hours before wilt sets in.',
      icon: <Activity className="text-emerald-400" size={24} />
    },
    {
      title: t('growthMonitoring'),
      desc: 'Synthetic Aperture Radar (SAR) sensors track growth stages even through thick cloud cover.',
      icon: <LineChart className="text-blue-400" size={24} />
    },
    {
      title: t('irrigation'),
      desc: 'Evapotranspiration metrics cross-reference local forecasts to calculate watering intervals.',
      icon: <Cpu className="text-purple-400" size={24} />
    },
    {
      title: t('satelliteMap'),
      desc: 'Interactive high-resolution Sentinel & Landsat maps render live vegetation heatmaps.',
      icon: <Globe className="text-amber-400" size={24} />
    },
    {
      title: t('predictions'),
      desc: 'Explainable AI forecasts crop yield curves, harvest calendars, and disease risks.',
      icon: <Shield className="text-red-400" size={24} />
    }
  ];

  const pipeline = [
    { step: '1', title: t('pipelineSat'), desc: 'Orbiting Sentinel-2 & Landsat constellations capture multispectral imagery.', icon: <Satellite size={22} /> },
    { step: '2', title: t('pipelinePre'), desc: 'Atmospheric correction & cloud masking filter pixel anomalies.', icon: <Database size={22} /> },
    { step: '3', title: t('pipelineAi'), desc: 'Deep learning models process NDVI, NDWI, EVI, and LST bands.', icon: <Cpu size={22} /> },
    { step: '4', title: t('pipelineDec'), desc: 'Advisory engine calculates farm health index and watering needs.', icon: <Workflow size={22} /> },
    { step: '5', title: t('pipelineDash'), desc: 'Live alerts, charts, and reports are served on CropOrbit UI.', icon: <Activity size={22} /> }
  ];

  const team = [
    { name: 'Aditi Rajput', role: 'Team Lead, AI/ML Engineer', sub: 'Geospatial Specialist' },
    { name: 'Pranjal Gupta', role: 'Satellite Data Processing', sub: 'Remote Sensing Analyst' },
    { name: 'Vaidehi Wate', role: 'Full Stack Developer', sub: 'UI/UX Lead Developer' },
    { name: 'Hiranya Raut', role: 'Domain Expert (Agriculture)', sub: 'Agronomist Specialist' }
  ];

  const handleDemoClick = () => {
    login('commander@croporbit.ai', 'Commander Ramesh');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 space-gradient relative overflow-hidden flex flex-col">
      {/* Decorative stars */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] animate-twinkle" />
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:48px_48px] animate-twinkle [animation-delay:2s]" />

      {/* Floating orbital glow (Earth) */}
      <div className="absolute -right-60 top-20 w-[600px] h-[600px] rounded-full bg-cyan-500/10 earth-glow border border-cyan-500/10 hidden xl:block pointer-events-none" />

      {/* Satellite orbit animation path */}
      <div className="absolute -right-[150px] top-[150px] w-[500px] h-[500px] orbit-path hidden xl:block pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-orbit">
          <Satellite size={32} className="rotate-45" />
        </div>
      </div>

      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-extrabold shadow-neon-cyan">
            <Globe size={18} />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white">
            CROP<span className="text-cyan-400">ORBIT</span> AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={handleDemoClick}
            className="px-4 py-2 text-xs font-bold rounded-xl glass-button-primary"
          >
            {t('liveDemo')}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 max-w-7xl mx-auto px-6 flex flex-col justify-center items-start pt-16 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-left"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-bold tracking-widest uppercase inline-flex items-center gap-1.5 mb-6">
            <Sparkles size={12} className="animate-spin [animation-duration:8s]" />
            PRECISION SPACE INTELLIGENCE
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Precision Farming <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
              Powered From Space
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
            Monitor crop growth cycles, track canopy stress, map soil moisture variables, and predict harvesting calendar windows using deep learning and multispectral satellite constellations.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold text-xs tracking-wider shadow-neon-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{t('getStarted')}</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={handleDemoClick}
              className="px-6 py-3 rounded-xl glass-button text-white font-semibold text-xs tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{t('liveDemo')}</span>
            </button>
            <button
              onClick={() => setShowVideoModal(true)}
              className="px-6 py-3 rounded-xl text-slate-400 hover:text-white font-semibold text-xs tracking-wider transition-colors flex items-center gap-2"
            >
              <Play size={14} className="text-cyan-400" />
              <span>{t('watchOverview')}</span>
            </button>
          </div>
        </motion.div>

        {/* Stats counter grid */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
          {stats.map((stat, idx) => (
            <GlassCard key={idx} variant="default" className="p-5" hoverEffect>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                {stat.isZero ? '0' : stat.value}
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">{stat.label}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Feature section */}
      <section className="w-full bg-slate-950/60 border-t border-slate-900/60 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl text-left mb-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Satellite Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Advanced planetary scanning tools designed for modern agronomists and precision farming operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <GlassCard key={idx} hoverEffect className="flex flex-col items-start gap-4">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80">
                  {feat.icon}
                </div>
                <h4 className="font-bold text-white text-base tracking-wide">{feat.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture pipeline section */}
      <section className="w-full py-24 bg-slate-950 relative z-10 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl text-left mb-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Data Pipeline & Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              From raw orbital imagery to actionable farm directives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
            {pipeline.map((step, idx) => (
              <div key={idx} className="relative flex flex-col">
                <GlassCard className="flex-1 p-6 relative flex flex-col gap-3 justify-between" hoverEffect>
                  <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border border-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="text-cyan-400 mt-2">
                    {step.icon}
                  </div>
                  <h4 className="font-bold text-white text-sm tracking-wide mt-2">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">{step.desc}</p>
                </GlassCard>
                {idx < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 translate-x-1/2 z-10 text-cyan-500">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-24 bg-slate-950/60 relative z-10 border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl text-left mb-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Users className="text-cyan-400" size={28} />
              Team – Orbital Queens
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Brought to you by engineers specializing in satellite data pipelines and remote sensing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {team.map((member, idx) => (
              <GlassCard key={idx} className="flex flex-col justify-center p-5" hoverEffect>
                <h4 className="font-bold text-white text-base tracking-wide">{member.name}</h4>
                <p className="text-xs text-cyan-400 font-semibold mt-0.5">{member.role}</p>
                <p className="text-[10px] text-slate-500 mt-1 font-bold">{member.sub}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-10 mt-auto bg-slate-950 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-xs font-semibold">
            &copy; 2026 CropOrbit AI. Space data sourced from Copernicus Sentinel-2. All rights reserved.
          </div>
          <div className="flex gap-4 text-slate-400 hover:text-white transition-colors">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              <Github size={18} />
            </a>
          </div>
        </div>
      </footer>

      {/* Video Modal Overlay */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-slate-850 bg-slate-950 shadow-2xl p-2">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 bg-slate-900 border border-slate-800 text-white font-bold p-1.5 rounded-lg hover:bg-slate-800"
            >
              Close
            </button>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900 flex flex-col items-center justify-center p-8 text-center gap-4">
              <div className="p-4 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 animate-bounce">
                <Satellite size={48} />
              </div>
              <h4 className="text-xl font-bold text-white">CropOrbit Overview Demonstration</h4>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                This simulation represents multitemporal satellite data streams scanning farming sectors. Close this dialog and click the 'Live Demo' or 'Get Started' triggers to interact with active fields and heatmap filters.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
