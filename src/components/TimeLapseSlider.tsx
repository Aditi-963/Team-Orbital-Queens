import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { GlassCard } from './GlassCard';

export const TimeLapseSlider: React.FC = () => {
  const { selectedFarm, t } = useApp();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const images = selectedFarm.timeLapseImages;
  
  // Use fallback images if the farm doesn't have multiple timelapse records
  const beforeImg = images[0]?.url || 'https://images.unsplash.com/photo-1500937386664-56d159062255?auto=format&fit=crop&w=800&q=80';
  const afterImg = images[images.length - 1]?.url || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80';

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <GlassCard className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-lg font-bold text-white">{t('timeLapseSlider')}</h4>
          <p className="text-xs text-slate-400">Multitemporal Satellite Verification</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-semibold border border-slate-700/60">
            {images[0]?.date || 'Before'}
          </span>
          <span className="text-slate-500">vs</span>
          <span className="px-2.5 py-1 rounded bg-cyan-950/40 text-cyan-300 font-semibold border border-cyan-800/40">
            {images[images.length - 1]?.date || 'Current'}
          </span>
        </div>
      </div>

      {/* Interactive slider frame */}
      <div
        ref={containerRef}
        className="relative flex-1 min-h-[300px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-slate-800"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Before Image (Left side / base) */}
        <div className="absolute inset-0 bg-slate-900">
          <img
            src={beforeImg}
            alt="Before"
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-semibold text-white">
            {t('beforeGrowth')} ({images[0]?.growthStage || 'Germination'})
          </div>
        </div>

        {/* After Image (Right side / clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={afterImg}
            alt="After"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width || '100%' }}
          />
          <div className="absolute bottom-4 right-4 bg-cyan-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-800/40 text-xs font-semibold text-cyan-300">
            {t('afterGrowth')} ({images[images.length - 1]?.growthStage || 'Maturity'})
          </div>
        </div>

        {/* Vertical Separator line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-cyan-400 shadow-neon-cyan cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Draggable indicator handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-neon-cyan flex items-center justify-center">
            <div className="flex gap-0.5 text-cyan-400 font-bold text-xs">
              <span>‹</span>
              <span>›</span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-3 italic">
        Drag the cyan bar horizontally to inspect crop canopy transformation.
      </p>
    </GlassCard>
  );
};

export default TimeLapseSlider;
