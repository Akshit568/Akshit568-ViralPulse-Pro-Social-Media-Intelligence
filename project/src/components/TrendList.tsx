import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Users } from 'lucide-react';
import { useTrend } from '../context/TrendContext';

const TrendList: React.FC = () => {
  const { trends, selectedTrend, setSelectedTrend } = useTrend();

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'reddit': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'tiktok': return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.2) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (sentiment < -0.2) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Users className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-cyber-purple" />
        Trending Topics
        <span className="ml-2 text-sm bg-cyber-purple/20 text-cyber-purple px-2 py-1 rounded">
          {trends.length} active
        </span>
      </h2>

      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedTrend(trend)}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-200 border
              ${selectedTrend?.id === trend.id
                ? 'bg-cyber-purple/20 border-cyber-purple/30 ring-1 ring-cyber-purple/50'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h3 className="font-medium text-lg">{trend.hashtag}</h3>
                <span className={`px-2 py-1 text-xs rounded border ${getPlatformColor(trend.platform)}`}>
                  {trend.platform}
                </span>
                {trend.controversy > 80 && (
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                {getSentimentIcon(trend.sentiment)}
                <span className={`text-sm ${trend.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {trend.growth > 0 ? '+' : ''}{trend.growth.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>{trend.volume.toLocaleString()} mentions</span>
              <span>{trend.region}</span>
            </div>

            {/* Controversy Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Controversy Level</span>
                <span>{trend.controversy}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    trend.controversy > 80 ? 'bg-red-400' :
                    trend.controversy > 60 ? 'bg-orange-400' :
                    trend.controversy > 40 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${trend.controversy}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TrendList;