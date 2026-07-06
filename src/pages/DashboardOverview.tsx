import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Sprout,
  Droplets,
  AlertTriangle,
  Activity,
  MoreVertical,
  Plus,
  Search,
  Maximize2,
  Sun,
  Wind,
  CloudRain,
  Sunrise,
  Sunset,
  CheckCircle2,
  MapPin,
  Sparkles,
  BarChart3
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom SVG Donut Chart
const DonutChart: React.FC<{ percentage: number; label: string }> = ({ percentage, label }) => {
  const radius = 38;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center h-28 w-28 flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="56"
          cy="56"
          r={radius}
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          cx="56"
          cy="56"
          r={radius}
          className="text-blue-500 transition-all duration-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-xl font-extrabold text-slate-800">{percentage}%</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
};

// Robot SVG Component
const RobotSvg: React.FC = () => {
  return (
    <svg className="w-16 h-16 text-green-500 flex-shrink-0" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="16" width="32" height="24" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5"/>
      <circle cx="26" cy="28" r="3" fill="#16a34a"/>
      <circle cx="38" cy="28" r="3" fill="#16a34a"/>
      <circle cx="20" cy="32" r="1.2" fill="#f43f5e"/>
      <circle cx="44" cy="32" r="1.2" fill="#f43f5e"/>
      <path d="M28 34H36" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 16V10" stroke="#16a34a" strokeWidth="2"/>
      <circle cx="32" cy="7.5" r="2.5" fill="#16a34a"/>
      <path d="M20 18L16 14" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M44 18L48 14" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="22" y="42" width="20" height="14" rx="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2"/>
      <path d="M17 46H22" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <path d="M42 46H47" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="49" r="2" fill="#16a34a" className="animate-pulse"/>
    </svg>
  );
};

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const { alerts } = useApp();
  const mapRef = useRef<L.Map | null>(null);
  const [mapMode, setMapMode] = useState<'satellite' | 'map'>('satellite');
  const baseTileRef = useRef<L.TileLayer | null>(null);

  // Initialize Map
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    if (!mapRef.current) {
      const map = L.map('dashboard-map-pane', {
        center: [30.211, 74.945],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      const satelliteTiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
      });

      satelliteTiles.addTo(map);
      baseTileRef.current = satelliteTiles;

      // Field A (Wheat) - Healthy (Green)
      L.polygon([
        [30.213, 74.942],
        [30.214, 74.948],
        [30.210, 74.948],
        [30.209, 74.942]
      ], {
        color: '#22c55e',
        fillColor: '#22c55e',
        fillOpacity: 0.45,
        weight: 2
      }).addTo(map).bindPopup('<b>Field A (Wheat)</b><br/>Status: Healthy<br/>Area: 12.5 Acres');

      // Field B (Rice) - Moderate (Yellow/Orange)
      L.polygon([
        [30.214, 74.949],
        [30.215, 74.955],
        [30.211, 74.956],
        [30.210, 74.949]
      ], {
        color: '#eab308',
        fillColor: '#eab308',
        fillOpacity: 0.45,
        weight: 2
      }).addTo(map).bindPopup('<b>Field B (Rice)</b><br/>Status: Moderate<br/>Area: 8.2 Acres');

      // Field C (Cotton) - At Risk (Red)
      L.polygon([
        [30.208, 74.942],
        [30.209, 74.948],
        [30.205, 74.949],
        [30.204, 74.943]
      ], {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.45,
        weight: 2
      }).addTo(map).bindPopup('<b>Field C (Cotton)</b><br/>Status: At Risk<br/>Area: 6.0 Acres');

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle map style toggling
  const handleMapModeChange = (mode: 'satellite' | 'map') => {
    setMapMode(mode);
    if (!mapRef.current) return;

    if (baseTileRef.current) {
      mapRef.current.removeLayer(baseTileRef.current);
    }

    let newUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    if (mode === 'map') {
      newUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    }

    const newTiles = L.tileLayer(newUrl, { maxZoom: 19 });
    newTiles.addTo(mapRef.current);
    baseTileRef.current = newTiles;
  };

  const handleZoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };
  const handleZoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };
  const handleLocate = () => {
    if (mapRef.current) mapRef.current.setView([30.211, 74.945], 14);
  };

  return (
    <div className="space-y-6">
      
      {/* ROW 1: My Farms | Quick Statistics | Weather Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1.1 My Farms */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] bg-white">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-extrabold text-slate-800">My Farms</h3>
              <button className="px-3.5 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm">
                <Plus size={14} />
                <span>Add Farm</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Field A */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                    <Sprout size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-850">Field A - Wheat</h4>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">12.5 Acres</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-[10px] text-green-600 font-extrabold whitespace-nowrap min-w-[70px] text-right">85% Healthy</span>
                  <button className="text-slate-450 hover:text-slate-700 flex-shrink-0">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Field B */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                    <Sprout size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-855">Field B - Rice</h4>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">8.2 Acres</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                  <span className="text-[10px] text-amber-500 font-extrabold whitespace-nowrap min-w-[70px] text-right">65% Moderate</span>
                  <button className="text-slate-455 hover:text-slate-700 flex-shrink-0">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Field C */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <Sprout size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-860">Field C - Cotton</h4>
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">6.0 Acres</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '30%' }} />
                  </div>
                  <span className="text-[10px] text-red-500 font-extrabold whitespace-nowrap min-w-[70px] text-right">30% At Risk</span>
                  <button className="text-slate-460 hover:text-slate-700 flex-shrink-0">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Link to="/farm-details" className="text-xs font-extrabold text-green-700 hover:text-green-800 hover:underline flex items-center gap-1 mt-4">
            <span>View All Farms</span>
            <span>→</span>
          </Link>
        </div>

        {/* 1.2 Quick Statistics */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] bg-white">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 mb-4">Quick Statistics</h3>
            
            {/* Horizontal 4 columns layout to match mockup */}
            <div className="grid grid-cols-4 gap-2">
              {/* Stat 1 */}
              <div className="p-2 border border-slate-100 rounded-xl bg-white flex flex-col items-center justify-between h-32 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="h-9 w-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                  <Sprout size={16} />
                </div>
                <h4 className="text-base font-black text-slate-850 mt-1">3</h4>
                <span className="text-[8px] text-slate-400 font-bold leading-tight mt-0.5">Total Crops Monitored</span>
              </div>

              {/* Stat 2 */}
              <div className="p-2 border border-slate-100 rounded-xl bg-white flex flex-col items-center justify-between h-32 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Droplets size={16} />
                </div>
                <h4 className="text-base font-black text-slate-850 mt-1">2.45K</h4>
                <span className="text-[8px] text-slate-400 font-bold leading-tight mt-0.5 font-sans">Liters Water Used Today</span>
              </div>

              {/* Stat 3 */}
              <div className="p-2 border border-slate-100 rounded-xl bg-white flex flex-col items-center justify-between h-32 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="h-9 w-9 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={16} />
                </div>
                <h4 className="text-base font-black text-slate-850 mt-1">1</h4>
                <span className="text-[8px] text-slate-400 font-bold leading-tight mt-0.5">Fields At Risk</span>
              </div>

              {/* Stat 4 */}
              <div className="p-2 border border-slate-100 rounded-xl bg-white flex flex-col items-center justify-between h-32 text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="h-9 w-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <BarChart3 size={16} />
                </div>
                <h4 className="text-base font-black text-slate-850 mt-1">87%</h4>
                <span className="text-[8px] text-slate-400 font-bold leading-tight mt-0.5">Average Crop Health</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Overall Health Score</span>
              <span className="text-green-600 font-black">87%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '87%' }} />
            </div>
          </div>
        </div>

        {/* 1.3 Weather Overview */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px] bg-white">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 mb-4">Weather Overview</h3>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Sun size={28} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800">28°C</h4>
                  <span className="text-xs text-slate-400 font-bold block mt-0.5">Partly Cloudy</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-650 font-semibold">
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center gap-2 text-slate-400"><Droplets size={14} className="text-blue-500" /> Humidity</span>
                <span className="text-slate-800 font-extrabold">65%</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center gap-2 text-slate-400"><Wind size={14} className="text-slate-550" /> Wind Speed</span>
                <span className="text-slate-800 font-extrabold">12 km/h</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center gap-2 text-slate-400"><CloudRain size={14} className="text-blue-400" /> Rain Probability</span>
                <span className="text-slate-800 font-extrabold">20%</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center gap-2 text-slate-400"><Sunrise size={14} className="text-amber-500" /> Sunrise</span>
                <span className="text-slate-800 font-extrabold">6:10 AM</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="flex items-center gap-2 text-slate-400"><Sunset size={14} className="text-red-400" /> Sunset</span>
                <span className="text-slate-800 font-extrabold">6:45 PM</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/weather')}
            className="w-full mt-4 py-2.5 bg-[#e8f5e9] hover:bg-[#e6f4ea] text-green-700 font-black text-xs rounded-xl transition-all shadow-sm"
          >
            View Full Forecast →
          </button>
        </div>

      </div>

      {/* ROW 2: Farm Map | Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2.1 Farm Map (Satellite View) */}
        <div className="glass-panel rounded-2xl p-6 lg:col-span-2 flex flex-col justify-between h-[450px] bg-white relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1">
              <span>Farm Map</span>
              <span className="text-slate-400 font-bold text-xs">(Satellite View)</span>
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="relative w-40">
                <input
                  type="text"
                  placeholder="Search location..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-3 pr-8 py-1.5 text-[10px] text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 pointer-events-none">
                  <Search size={12} />
                </span>
              </div>
              
              <div className="flex p-0.5 bg-slate-100 rounded-lg">
                <button
                  onClick={() => handleMapModeChange('satellite')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                    mapMode === 'satellite' ? 'bg-green-700 text-white shadow-sm' : 'text-slate-650 hover:text-slate-850'
                  }`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => handleMapModeChange('map')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                    mapMode === 'map' ? 'bg-green-700 text-white shadow-sm' : 'text-slate-650 hover:text-slate-850'
                  }`}
                >
                  Map
                </button>
              </div>
              
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500">
                <Maximize2 size={14} />
              </button>
            </div>
          </div>

          {/* Map Pane */}
          <div className="flex-1 w-full bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200 shadow-inner">
            <div id="dashboard-map-pane" className="w-full h-full z-10" />
            
            {/* Legend (Bottom Left) */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200 text-[10px] font-extrabold text-slate-700 space-y-1.5 flex flex-col pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>Field A (Wheat) - Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                <span>Field B (Rice) - Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span>Field C (Cotton) - At Risk</span>
              </div>
            </div>

            {/* Map Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5 pointer-events-auto">
              <button
                onClick={handleZoomIn}
                className="h-8 w-8 rounded-lg bg-white border border-slate-200 shadow-md text-slate-800 font-extrabold hover:bg-slate-50 flex items-center justify-center text-sm"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="h-8 w-8 rounded-lg bg-white border border-slate-200 shadow-md text-slate-800 font-extrabold hover:bg-slate-50 flex items-center justify-center text-sm"
              >
                -
              </button>
              <button
                onClick={handleLocate}
                className="h-8 w-8 rounded-lg bg-white border border-slate-200 shadow-md text-slate-550 hover:bg-slate-50 flex items-center justify-center"
              >
                <MapPin size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 2.2 Recent Alerts */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[450px] bg-white">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-extrabold text-slate-800">Recent Alerts</h3>
              <Link to="/alerts" className="text-xs font-bold text-green-700 hover:underline">View All</Link>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {alerts.filter(a => !a.resolved).slice(0, 3).length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center mb-2">
                    <CheckCircle2 size={20} />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-800">All systems normal</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">No active anomalies detected.</p>
                </div>
              ) : (
                alerts.filter(a => !a.resolved).slice(0, 3).map(alert => (
                  <div 
                    key={alert.id} 
                    className={`p-3 border rounded-2xl flex items-start gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${
                      alert.severity === 'critical' 
                        ? 'bg-red-50/70 border-red-100 text-red-800' 
                        : alert.severity === 'warning'
                          ? 'bg-amber-50/70 border-amber-100 text-amber-800'
                          : 'bg-cyan-50/70 border-cyan-100 text-cyan-800'
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      alert.severity === 'critical' 
                        ? 'bg-red-100 text-red-600' 
                        : alert.severity === 'warning'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-cyan-100 text-cyan-600'
                    }`}>
                      <AlertTriangle size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{alert.farmName}</h4>
                      <p className="text-xs font-black text-slate-800 mt-0.5 truncate">{alert.message}</p>
                      <span className="text-[9px] text-slate-405 font-semibold block mt-1">{alert.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <button 
            onClick={() => navigate('/alerts')}
            className="w-full mt-4 py-2.5 bg-[#e8f5e9] hover:bg-[#e6f4ea] text-green-700 font-black text-xs rounded-xl transition-all shadow-sm"
          >
            All Alerts →
          </button>
        </div>

      </div>

      {/* ROW 3: Crop Detection | Irrigation Overview | AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3.1 Crop Detection - Field B */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[300px] bg-white">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 mb-4">Crop Detection - Field B</h3>
            <div className="flex gap-4 items-start">
              {/* Field Image */}
              <div className="h-28 w-28 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm bg-slate-50">
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80"
                  alt="Rice field"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Metadata Table */}
              <div className="flex-1 space-y-1.5 text-[10px] text-slate-650 font-semibold">
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-400">Crop Type</span>
                  <span className="text-slate-850 uppercase font-extrabold">RICE</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-400">Confidence</span>
                  <span className="text-slate-850 font-extrabold">92.4%</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-400">Area</span>
                  <span className="text-slate-855 font-extrabold">8.2 Acres</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-400">Sowing Date</span>
                  <span className="text-slate-860 font-extrabold">Nov 15, 2025</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-slate-100">
                  <span className="text-slate-400">Current Stage</span>
                  <span className="text-slate-865 font-extrabold">Flowering (Day 65)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-450">Water Need</span>
                  <span className="text-green-700 font-extrabold">25 mm/acre</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/farm-details')}
            className="w-full mt-4 py-2.5 bg-[#e8f5e9] hover:bg-[#e6f4ea] text-green-700 font-black text-xs rounded-xl transition-all shadow-sm"
          >
            View Full Details →
          </button>
        </div>

        {/* 3.2 Irrigation Overview */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[300px] bg-white">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 mb-4">Irrigation Overview</h3>
            <div className="flex items-center justify-between gap-2">
              {/* Circular Progress Donut */}
              <DonutChart percentage={65} label="Efficient" />
              
              {/* Irrigation Numbers */}
              <div className="flex-1 space-y-3.5 pl-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-6.5 w-6.5 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Droplets size={13} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Today's Usage</span>
                    <span className="text-xs font-black text-slate-800">2,450 Liters</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <div className="h-6.5 w-6.5 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Droplets size={13} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">This Week</span>
                    <span className="text-xs font-black text-slate-800">18,200 Liters</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-extrabold tracking-wider pl-1.5">
                  65% 68%
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/irrigation')}
            className="w-full mt-4 py-2.5 bg-[#e8f0fe] hover:bg-[#e8f4ff] text-blue-700 font-black text-xs rounded-xl transition-all shadow-sm"
          >
            Manage Irrigation →
          </button>
        </div>

        {/* 3.3 AI Recommendation */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[300px] bg-white">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-1">
              <Sparkles size={16} className="text-green-600" />
              <span>AI Recommendation</span>
            </h3>
            
            <div className="flex gap-4 items-start">
              {/* Text recommendations */}
              <div className="flex-1 space-y-3">
                <div className="p-3 bg-green-50/50 border border-green-100 rounded-xl text-[11px] font-semibold text-slate-700 leading-relaxed">
                  Field B (Rice) needs irrigation in next 48 hours. Recommended: <span className="text-green-700 font-bold">25mm water per acre</span>.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-semibold text-slate-600 leading-relaxed">
                  Also monitor for potential pest attack in coming week.
                </div>
              </div>
              {/* Cute Robot SVG */}
              <RobotSvg />
            </div>
          </div>

          <button 
            onClick={() => navigate('/predictions')}
            className="w-full mt-4 py-2.5 bg-[#e8f5e9] hover:bg-[#e6f4ea] text-green-700 font-black text-xs rounded-xl transition-all shadow-sm"
          >
            View All Recommendations →
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="pt-8 pb-4 flex flex-col sm:flex-row justify-between items-center text-[10px] font-bold text-slate-400 gap-2 border-t border-slate-200">
        <span>© 2025 CropOrbit AI. All rights reserved.</span>
        <span className="flex items-center gap-1">
          <span>Powered by AI</span>
          <span>•</span>
          <span>Data from Sentinel & ISRO 🛰️</span>
        </span>
      </footer>

    </div>
  );
};

export default DashboardOverview;
