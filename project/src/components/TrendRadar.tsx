import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { useTrend } from '../context/TrendContext';

const TrendRadar: React.FC = () => {
  const { selectedTrend } = useTrend();

  if (!selectedTrend) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        Select a trend to view its DNA profile
      </div>
    );
  }

  const radarData = [
    {
      metric: 'Virality',
      value: Math.min(100, (selectedTrend.volume / 1000)),
      fullMark: 100
    },
    {
      metric: 'Sentiment',
      value: (selectedTrend.sentiment + 1) * 50, // Convert -1 to 1 range to 0-100
      fullMark: 100
    },
    {
      metric: 'Controversy',
      value: selectedTrend.controversy,
      fullMark: 100
    },
    {
      metric: 'Growth Rate',
      value: Math.max(0, selectedTrend.growth * 5 + 50), // Normalize growth
      fullMark: 100
    },
    {
      metric: 'Engagement',
      value: 65 + Math.random() * 30, // Mock engagement score
      fullMark: 100
    },
    {
      metric: 'Reach',
      value: Math.min(100, selectedTrend.volume / 2000),
      fullMark: 100
    }
  ];

  const getRadarColor = () => {
    if (selectedTrend.platform === 'twitter') return '#3b82f6';
    if (selectedTrend.platform === 'reddit') return '#f97316';
    if (selectedTrend.platform === 'tiktok') return '#1f2937';
    return '#a855f7';
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <PolarGrid 
            stroke="#374151" 
            strokeWidth={1}
          />
          <PolarAngleAxis 
            dataKey="metric" 
            tick={{ 
              fontSize: 11, 
              fill: '#9ca3af',
              fontFamily: 'Inter'
            }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]}
            tick={{ 
              fontSize: 10, 
              fill: '#6b7280' 
            }}
            tickCount={4}
          />
          <Radar
            name={selectedTrend.hashtag}
            dataKey="value"
            stroke={getRadarColor()}
            fill={getRadarColor()}
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ 
              r: 4, 
              fill: getRadarColor(),
              strokeWidth: 2,
              stroke: '#fff'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
      
      {/* Stats below radar */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-cyber-purple">
            {selectedTrend.volume.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Volume</div>
        </div>
        <div>
          <div className="text-lg font-bold text-cyber-teal">
            {selectedTrend.controversy}%
          </div>
          <div className="text-xs text-gray-400">Controversy</div>
        </div>
        <div>
          <div className={`text-lg font-bold ${selectedTrend.growth > 0 ? 'text-cyber-green' : 'text-red-400'}`}>
            {selectedTrend.growth > 0 ? '+' : ''}{selectedTrend.growth.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Growth</div>
        </div>
      </div>
    </div>
  );
};

export default TrendRadar;