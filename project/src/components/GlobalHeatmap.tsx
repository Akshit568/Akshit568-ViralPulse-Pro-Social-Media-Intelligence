import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeatmapRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  intensity: number;
  trend: string;
}

const GlobalHeatmap: React.FC = () => {
  const [regions, setRegions] = useState<HeatmapRegion[]>([
    { id: '1', name: 'North America', x: 25, y: 35, intensity: 85, trend: '#TechLayoffs' },
    { id: '2', name: 'Europe', x: 50, y: 30, intensity: 72, trend: '#ClimateAction' },
    { id: '3', name: 'Asia Pacific', x: 75, y: 45, intensity: 91, trend: '#AIethics' },
    { id: '4', name: 'South America', x: 30, y: 65, intensity: 64, trend: '#CryptoRegulation' },
    { id: '5', name: 'Africa', x: 55, y: 60, intensity: 78, trend: '#ClimateAction' },
    { id: '6', name: 'Middle East', x: 60, y: 40, intensity: 89, trend: '#UkraineWar' },
  ]);

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [pulseAnimations, setPulseAnimations] = useState<string[]>([]);

  useEffect(() => {
    // Simulate real-time intensity changes
    const interval = setInterval(() => {
      setRegions(prev => prev.map(region => ({
        ...region,
        intensity: Math.max(30, Math.min(100, region.intensity + (Math.random() - 0.5) * 10))
      })));

      // Trigger pulse animation for high-intensity regions
      const highIntensityRegions = regions
        .filter(r => r.intensity > 85)
        .map(r => r.id);
      setPulseAnimations(highIntensityRegions);
    }, 2000);

    return () => clearInterval(interval);
  }, [regions]);

  const getIntensityColor = (intensity: number) => {
    if (intensity > 80) return '#ef4444'; // red
    if (intensity > 60) return '#f97316'; // orange
    if (intensity > 40) return '#eab308'; // yellow
    return '#22c55e'; // green
  };

  return (
    <div className="relative w-full h-80 bg-gray-800/50 rounded-lg overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Simplified world map paths */}
          <path
            d="M 50 80 Q 80 70, 120 80 Q 150 85, 180 75 Q 220 80, 250 85 Q 280 75, 320 80 L 320 120 Q 280 110, 250 115 Q 220 120, 180 115 Q 150 115, 120 120 Q 80 110, 50 120 Z"
            fill="rgba(255,255,255,0.1)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Heat Points */}
      <AnimatePresence>
        {regions.map((region) => (
          <motion.div
            key={region.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute cursor-pointer"
            style={{
              left: `${region.x}%`,
              top: `${region.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            {/* Pulse rings for high intensity */}
            {pulseAnimations.includes(region.id) && (
              <div className="absolute inset-0">
                <div 
                  className="pulse-ring border-2"
                  style={{ borderColor: getIntensityColor(region.intensity) }}
                />
                <div 
                  className="pulse-ring border-2"
                  style={{ 
                    borderColor: getIntensityColor(region.intensity),
                    animationDelay: '1s'
                  }}
                />
              </div>
            )}

            {/* Heat point */}
            <motion.div
              animate={{ 
                scale: hoveredRegion === region.id ? 1.2 : 1,
                boxShadow: `0 0 ${region.intensity / 5}px ${getIntensityColor(region.intensity)}`
              }}
              className="w-4 h-4 rounded-full relative z-10"
              style={{ 
                backgroundColor: getIntensityColor(region.intensity),
                opacity: region.intensity / 100
              }}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredRegion === region.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: -10, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-xs whitespace-nowrap z-20"
                >
                  <div className="font-medium">{region.name}</div>
                  <div className="text-gray-300">{region.trend}</div>
                  <div className="text-gray-400">Intensity: {region.intensity}%</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
        <div className="text-xs font-medium mb-2">Intensity</div>
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Low</span>
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>Med</span>
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span>High</span>
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 text-xs">
        <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
        <span className="text-gray-300">Live Updates</span>
      </div>
    </div>
  );
};

export default GlobalHeatmap;