import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Zap, Users } from 'lucide-react';
import { useTrend } from '../context/TrendContext';
import GlobalHeatmap from './GlobalHeatmap';
import TrendRadar from './TrendRadar';
import PlatformToggle from './PlatformToggle';
import TrendList from './TrendList';

const WarRoom: React.FC = () => {
  const { trends, selectedTrend } = useTrend();
  const [stats, setStats] = useState({
    totalTrends: 23745,
    activeRegions: 47,
    avgSentiment: 0.12,
    controversyLevel: 'MODERATE'
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalTrends: prev.totalTrends + Math.floor(Math.random() * 10) - 5,
        activeRegions: Math.max(30, Math.min(60, prev.activeRegions + Math.floor(Math.random() * 3) - 1)),
        avgSentiment: Math.max(-1, Math.min(1, prev.avgSentiment + (Math.random() - 0.5) * 0.1)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Total Trends',
      value: stats.totalTrends.toLocaleString(),
      icon: TrendingUp,
      color: 'cyber-purple',
      change: '+2.1%'
    },
    {
      title: 'Active Regions',
      value: stats.activeRegions.toString(),
      icon: Globe,
      color: 'cyber-teal',
      change: '+0.8%'
    },
    {
      title: 'Avg Sentiment',
      value: (stats.avgSentiment * 100).toFixed(1) + '%',
      icon: Users,
      color: stats.avgSentiment > 0 ? 'cyber-green' : 'red-500',
      change: stats.avgSentiment > 0 ? '+' : ''
    },
    {
      title: 'Controversy Level',
      value: stats.controversyLevel,
      icon: Zap,
      color: 'orange-500',
      change: 'STABLE'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Live Social Media War Room</h1>
        <p className="text-gray-400">Real-time global trend monitoring and analysis</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                <span className="text-xs text-gray-400">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Platform Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <PlatformToggle />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Global Heatmap */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-cyber-teal" />
            Animated Global Heatmap
          </h2>
          <GlobalHeatmap />
        </motion.div>

        {/* Trend DNA Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-cyber-purple" />
            Trend DNA Radar
            {selectedTrend && (
              <span className="ml-2 text-sm bg-cyber-purple/20 text-cyber-purple px-2 py-1 rounded">
                {selectedTrend.hashtag}
              </span>
            )}
          </h2>
          <TrendRadar />
        </motion.div>
      </div>

      {/* Trending Topics List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <TrendList />
      </motion.div>
    </div>
  );
};

export default WarRoom;