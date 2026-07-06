import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Farm } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import GlassCard from '../components/GlassCard';
import { Layers, Activity, Droplets, Thermometer, Maximize2, Compass } from 'lucide-react';

export const SatelliteMap: React.FC = () => {
  const { farms, selectedFarm, setSelectedFarm, t } = useApp();
  const [activeOverlay, setActiveOverlay] = useState<'ndvi' | 'ndwi' | 'moisture' | 'lst'>('ndvi');
  const [hoveredCoordinate, setHoveredCoordinate] = useState<[number, number]>([selectedFarm.lat, selectedFarm.lng]);
  const [selectedFarmLocal, setSelectedFarmLocal] = useState<Farm | null>(selectedFarm);

  const mapRef = useRef<L.Map | null>(null);
  const polygonsGroupRef = useRef<L.FeatureGroup | null>(null);

  // Get index color depending on farm metrics and active toggle
  const getFillColor = (farm: Farm, overlay: 'ndvi' | 'ndwi' | 'moisture' | 'lst') => {
    switch (overlay) {
      case 'ndwi': // water index (0 to 1)
        if (farm.ndwi > 0.7) return '#1d4ed8'; // deep blue
        if (farm.ndwi > 0.5) return '#3b82f6'; // normal blue
        return '#93c5fd'; // light blue
      case 'moisture': // soil moisture (0 to 100)
        if (farm.soilMoisture > 70) return '#0d9488'; // deep teal
        if (farm.soilMoisture > 45) return '#06b6d4'; // cyan
        return '#f59e0b'; // dry warning amber
      case 'lst': // land surface temp (°C)
        if (farm.lst > 32) return '#ef4444'; // hot red
        if (farm.lst > 28) return '#f97316'; // orange
        return '#eab308'; // yellow
      case 'ndvi': // vegetation index (0 to 1)
      default:
        if (farm.ndvi > 0.8) return '#15803d'; // high green
        if (farm.ndvi > 0.6) return '#22c55e'; // moderate green
        return '#eab308'; // low yellow/warning
    }
  };

  const getOverlayLabel = () => {
    switch (activeOverlay) {
      case 'ndwi': return 'Normalized Difference Water Index (NDWI)';
      case 'moisture': return 'Soil Moisture Saturation (%)';
      case 'lst': return 'Land Surface Temperature (LST)';
      case 'ndvi':
      default: return 'Normalized Difference Vegetation Index (NDVI)';
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    // Standard Leaflet anchor fix for markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    if (!mapRef.current) {
      // Create map instance
      const map = L.map('satellite-map-pane', {
        center: [selectedFarm.lat, selectedFarm.lng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      // Load high-resolution Satellite Imagery (Esri World Imagery)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
      }).addTo(map);

      // Create a layer group for farm polygons
      const polygonsGroup = L.featureGroup().addTo(map);
      polygonsGroupRef.current = polygonsGroup;
      mapRef.current = map;

      // Add a custom cursor coordinate listener
      map.on('mousemove', (e: L.LeafletMouseEvent) => {
        setHoveredCoordinate([
          parseFloat(e.latlng.lat.toFixed(5)),
          parseFloat(e.latlng.lng.toFixed(5))
        ]);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update boundary polygons when active index overlay or farms collection changes
  useEffect(() => {
    if (!mapRef.current || !polygonsGroupRef.current) return;

    // Clear existing overlay features
    polygonsGroupRef.current.clearLayers();

    farms.forEach((farm) => {
      const color = getFillColor(farm, activeOverlay);

      const polygon = L.polygon(farm.boundary, {
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.45,
        dashArray: '4,4',
      });

      // Bind click handler
      polygon.on('click', () => {
        setSelectedFarmLocal(farm);
        setSelectedFarm(farm);
        // Pan map center
        mapRef.current?.panTo([farm.lat, farm.lng]);
      });

      // Bind hover visual cues
      polygon.on('mouseover', () => {
        polygon.setStyle({ fillOpacity: 0.7, weight: 3 });
      });
      polygon.on('mouseout', () => {
        polygon.setStyle({ fillOpacity: 0.45, weight: 2 });
      });

      // Add details popup
      polygon.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; font-size: 11px;">
          <h4 style="font-weight: bold; margin: 0; color: #fff;">${farm.name}</h4>
          <p style="margin: 4px 0 0 0; color: #94a3b8;">Crop: ${farm.cropType}</p>
          <p style="margin: 2px 0 0 0; color: #22c55e;">NDVI: ${farm.ndvi}</p>
        </div>
      `);

      polygonsGroupRef.current?.addLayer(polygon);
    });

    // Zoom map fit bounds to all farms on initial load
    if (polygonsGroupRef.current.getLayers().length > 0) {
      const bounds = polygonsGroupRef.current.getBounds();
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [farms, activeOverlay]);

  // Handle zooming map to selectedFarm
  useEffect(() => {
    if (mapRef.current && selectedFarm) {
      mapRef.current.panTo([selectedFarm.lat, selectedFarm.lng]);
      setSelectedFarmLocal(selectedFarm);
    }
  }, [selectedFarm]);

  const handleRecenter = () => {
    if (mapRef.current && selectedFarm) {
      mapRef.current.setView([selectedFarm.lat, selectedFarm.lng], 15);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-6 relative">
      {/* Map Pane Wrapper */}
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-900 shadow-2xl bg-slate-950">
        <div id="satellite-map-pane" className="h-full w-full" />

        {/* Index Overlay Selector Widget */}
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
          <GlassCard className="p-2 flex gap-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveOverlay('ndvi')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeOverlay === 'ndvi' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title="Vegetation Health Index"
            >
              <Activity size={14} />
              <span className="hidden sm:inline">NDVI</span>
            </button>
            <button
              onClick={() => setActiveOverlay('ndwi')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeOverlay === 'ndwi' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title="Water Canopy Index"
            >
              <Layers size={14} />
              <span className="hidden sm:inline">NDWI</span>
            </button>
            <button
              onClick={() => setActiveOverlay('moisture')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeOverlay === 'moisture' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title="Soil Moisture Index"
            >
              <Droplets size={14} />
              <span className="hidden sm:inline">Moisture</span>
            </button>
            <button
              onClick={() => setActiveOverlay('lst')}
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeOverlay === 'lst' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title="Land Surface Temperature"
            >
              <Thermometer size={14} />
              <span className="hidden sm:inline">LST Heatmap</span>
            </button>
          </GlassCard>
        </div>

        {/* Live Coordinate Inspector */}
        <div className="absolute bottom-4 left-4 z-[1000] px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] text-slate-400 font-bold flex items-center gap-2">
          <Compass size={12} className="text-cyan-400 animate-spin [animation-duration:10s]" />
          <span>CURSOR LAT: {hoveredCoordinate[0]}</span>
          <span>•</span>
          <span>LNG: {hoveredCoordinate[1]}</span>
        </div>

        {/* Recenter button */}
        <div className="absolute top-4 right-4 z-[1000]">
          <button
            onClick={handleRecenter}
            className="p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-400 transition-all"
            title="Recenter to active field"
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Interactive map legend overlay */}
        <div className="absolute bottom-4 right-4 z-[1000]">
          <GlassCard className="p-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl flex flex-col gap-1 text-[10px] text-slate-400">
            <span className="font-semibold text-white uppercase tracking-wider mb-1">Index Spectrum</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px]">Low</span>
              <div className={`h-2.5 w-24 rounded-full bg-gradient-to-r ${
                activeOverlay === 'ndvi' ? 'from-amber-500 to-emerald-600' :
                activeOverlay === 'ndwi' ? 'from-blue-200 to-blue-800' :
                activeOverlay === 'moisture' ? 'from-amber-500 via-cyan-500 to-teal-700' :
                'from-yellow-400 via-orange-500 to-red-600'
              }`} />
              <span className="text-[9px]">High</span>
            </div>
            <span className="text-[8px] text-slate-500 font-medium tracking-wide mt-1 block">Tuned Sentinel-2 Feed</span>
          </GlassCard>
        </div>
      </div>

      {/* Field Inspection Details pane */}
      {selectedFarmLocal && (
        <GlassCard className="w-full lg:w-80 flex flex-col justify-between border-slate-800" hoverEffect>
          <div>
            <div className="border-b border-slate-900 pb-3 mb-4">
              <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">Field Telemetry</span>
              <h3 className="text-lg font-extrabold text-white mt-1">{selectedFarmLocal.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{selectedFarmLocal.location.split(',')[0]}</p>
            </div>

            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Crop Canopy</span>
                <span className="font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {selectedFarmLocal.cropType}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Field Size</span>
                <span className="font-semibold text-white">{selectedFarmLocal.area} Hectares</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">NDVI Greenness</span>
                <span className="font-bold text-emerald-400">{selectedFarmLocal.ndvi}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Soil Moisture</span>
                <span className="font-bold text-cyan-400">{selectedFarmLocal.soilMoisture}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Surface Temp (LST)</span>
                <span className="font-bold text-amber-500">{selectedFarmLocal.lst}°C</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">AI Yield Confidence</span>
                <span className="font-semibold text-white">92.4%</span>
              </div>
            </div>

            {/* Diagnostic warning overlay */}
            <div className="mt-6 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] leading-relaxed text-slate-400 flex flex-col gap-1.5">
              <span className="font-bold text-white flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Active Map Overlay:
              </span>
              <span>{getOverlayLabel()}</span>
            </div>
          </div>

          <button
            onClick={() => setSelectedFarm(selectedFarmLocal)}
            className="w-full mt-6 py-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/40 text-cyan-400 hover:text-white font-bold text-xs tracking-wider transition-all"
          >
            SELECT FARM
          </button>
        </GlassCard>
      )}
    </div>
  );
};

export default SatelliteMap;
