import React, { createContext, useContext, useState, useEffect } from 'react';

interface Trend {
  id: string;
  hashtag: string;
  volume: number;
  sentiment: number;
  controversy: number;
  platform: 'twitter' | 'reddit' | 'tiktok';
  region: string;
  growth: number;
}

interface TrendContextType {
  trends: Trend[];
  selectedTrend: Trend | null;
  setSelectedTrend: (trend: Trend | null) => void;
  platform: 'twitter' | 'reddit' | 'tiktok' | 'all';
  setPlatform: (platform: 'twitter' | 'reddit' | 'tiktok' | 'all') => void;
}

const TrendContext = createContext<TrendContextType | undefined>(undefined);

export const useTrend = () => {
  const context = useContext(TrendContext);
  if (!context) {
    throw new Error('useTrend must be used within a TrendProvider');
  }
  return context;
};

const mockTrends: Trend[] = [
  { id: '1', hashtag: '#AIethics', volume: 125000, sentiment: 0.3, controversy: 85, platform: 'twitter', region: 'USA', growth: 12.5 },
  { id: '2', hashtag: '#ClimateAction', volume: 89000, sentiment: 0.7, controversy: 72, platform: 'twitter', region: 'Europe', growth: 8.2 },
  { id: '3', hashtag: '#CryptoRegulation', volume: 156000, sentiment: -0.2, controversy: 91, platform: 'reddit', region: 'Global', growth: -5.1 },
  { id: '4', hashtag: '#TechLayoffs', volume: 234000, sentiment: -0.5, controversy: 68, platform: 'twitter', region: 'USA', growth: 15.7 },
  { id: '5', hashtag: '#ElonMusk', volume: 445000, sentiment: 0.1, controversy: 88, platform: 'twitter', region: 'Global', growth: -2.3 },
  { id: '6', hashtag: '#UkraineWar', volume: 312000, sentiment: -0.3, controversy: 94, platform: 'reddit', region: 'Europe', growth: 3.4 },
  { id: '7', hashtag: '#DanceChallenge', volume: 678000, sentiment: 0.8, controversy: 15, platform: 'tiktok', region: 'Global', growth: 25.6 },
  { id: '8', hashtag: '#StreamingWars', volume: 187000, sentiment: 0.2, controversy: 55, platform: 'reddit', region: 'USA', growth: 7.8 },
];

export const TrendProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trends, setTrends] = useState<Trend[]>(mockTrends);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(mockTrends[0]);
  const [platform, setPlatform] = useState<'twitter' | 'reddit' | 'tiktok' | 'all'>('all');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrends(prev => prev.map(trend => ({
        ...trend,
        volume: trend.volume + Math.floor(Math.random() * 1000) - 500,
        controversy: Math.max(0, Math.min(100, trend.controversy + (Math.random() - 0.5) * 5)),
        growth: trend.growth + (Math.random() - 0.5) * 2,
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredTrends = platform === 'all' ? trends : trends.filter(t => t.platform === platform);

  return (
    <TrendContext.Provider value={{
      trends: filteredTrends,
      selectedTrend,
      setSelectedTrend,
      platform,
      setPlatform,
    }}>
      {children}
    </TrendContext.Provider>
  );
};