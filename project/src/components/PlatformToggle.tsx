import React from 'react';
import { motion } from 'framer-motion';
import { useTrend } from '../context/TrendContext';

const PlatformToggle: React.FC = () => {
  const { platform, setPlatform } = useTrend();

  const platforms = [
    { id: 'all', label: 'All Platforms', color: 'cyber-purple', icon: '🌐' },
    { id: 'twitter', label: 'Twitter', color: 'blue-500', icon: '🐦' },
    { id: 'reddit', label: 'Reddit', color: 'orange-500', icon: '🔴' },
    { id: 'tiktok', label: 'TikTok', color: 'gray-800', icon: '⚫' },
  ] as const;

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-3">Platform Filter</h3>
      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => setPlatform(p.id as any)}
            className={`
              relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${platform === p.id
                ? `bg-${p.color}/20 text-${p.color} border border-${p.color}/30`
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-2">
              <span>{p.icon}</span>
              <span>{p.label}</span>
            </div>
            {platform === p.id && (
              <motion.div
                layoutId="platformHighlight"
                className={`absolute inset-0 bg-${p.color}/10 rounded-lg`}
                initial={false}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PlatformToggle;