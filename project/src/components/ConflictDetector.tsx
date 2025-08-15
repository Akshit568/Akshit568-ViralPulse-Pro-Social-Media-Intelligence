import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, Quote, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { useTrend } from '../context/TrendContext';

interface OpposingView {
  side: 'for' | 'against';
  percentage: number;
  keyQuotes: string[];
  influencers: { name: string; credibility: number; quote: string }[];
}

interface HistoricalParallel {
  event: string;
  similarity: number;
  description: string;
}

const ConflictDetector: React.FC = () => {
  const { selectedTrend, trends } = useTrend();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [opposingViews, setOpposingViews] = useState<OpposingView[]>([]);
  const [historicalParallels, setHistoricalParallels] = useState<HistoricalParallel[]>([]);

  useEffect(() => {
    if (selectedTrend && selectedTrend.controversy > 50) {
      setIsAnalyzing(true);
      
      // Simulate analysis delay
      setTimeout(() => {
        generateConflictAnalysis(selectedTrend);
        setIsAnalyzing(false);
      }, 1500);
    }
  }, [selectedTrend]);

  const generateConflictAnalysis = (trend: any) => {
    // Generate opposing viewpoints based on trend
    const forPercentage = 50 + (trend.sentiment * 20) + (Math.random() * 20 - 10);
    const againstPercentage = 100 - forPercentage;

    const mockInfluencers = {
      for: [
        { name: '@TechExpert2023', credibility: 92, quote: 'This represents a fundamental shift in how we approach innovation.' },
        { name: '@PolicyWonk', credibility: 88, quote: 'The long-term benefits far outweigh the short-term concerns.' },
        { name: '@IndustryLeader', credibility: 95, quote: 'We need to embrace change rather than resist it.' }
      ],
      against: [
        { name: '@SkepticalAnalyst', credibility: 89, quote: 'The risks are being severely underestimated by proponents.' },
        { name: '@ConcernedCitizen', credibility: 76, quote: 'This could have serious unintended consequences.' },
        { name: '@CriticalThinking', credibility: 84, quote: 'More research is needed before moving forward.' }
      ]
    };

    const views: OpposingView[] = [
      {
        side: 'for',
        percentage: Math.round(forPercentage),
        keyQuotes: ['Innovation drives progress', 'Benefits outweigh risks', 'Time for change'],
        influencers: mockInfluencers.for
      },
      {
        side: 'against',
        percentage: Math.round(againstPercentage),
        keyQuotes: ['Too many unknowns', 'Rushed implementation', 'Need more oversight'],
        influencers: mockInfluencers.against
      }
    ];

    const parallels: HistoricalParallel[] = [
      { event: '#Brexit', similarity: 85, description: 'Similar polarization patterns and sentiment volatility' },
      { event: '#ClimateDebate2019', similarity: 72, description: 'Comparable controversy metrics and engagement rates' },
      { event: '#NetNeutrality', similarity: 68, description: 'Similar technical complexity driving public discourse' }
    ];

    setOpposingViews(views);
    setHistoricalParallels(parallels);
  };

  if (!selectedTrend) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <Target className="w-16 h-16 text-cyber-purple mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2">Conflict Detector™</h2>
          <p className="text-gray-400">Select a trending topic to analyze opposing viewpoints</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Target className="w-8 h-8 text-cyber-purple" />
          <div>
            <h1 className="text-3xl font-bold">Conflict Detector™</h1>
            <p className="text-gray-400">Advanced polarization analysis</p>
          </div>
          {selectedTrend.controversy > 80 && (
            <div className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">High Controversy</span>
            </div>
          )}
        </div>

        <div className="glass-card p-4 inline-flex items-center space-x-4">
          <span className="text-gray-400">Analyzing:</span>
          <span className="text-xl font-semibold text-cyber-purple">{selectedTrend.hashtag}</span>
          <div className={`px-3 py-1 rounded-full text-xs border ${
            selectedTrend.platform === 'twitter' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
            selectedTrend.platform === 'reddit' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
            'bg-gray-600/20 text-gray-400 border-gray-600/30'
          }`}>
            {selectedTrend.platform}
          </div>
          <span className="text-sm text-gray-400">{selectedTrend.volume.toLocaleString()} mentions</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isAnalyzing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-cyber-purple/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyber-purple animate-spin"></div>
              <Target className="absolute inset-0 m-auto w-8 h-8 text-cyber-purple" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analyzing Conflict Patterns</h3>
            <p className="text-gray-400">Processing sentiment clusters and opposition groups...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Opposing Viewpoints */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opposingViews.map((view, index) => (
                <motion.div
                  key={view.side}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`glass-card p-6 ${
                    view.side === 'for' 
                      ? 'border-l-4 border-l-green-400' 
                      : 'border-l-4 border-l-red-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold capitalize flex items-center">
                      {view.side === 'for' ? (
                        <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                      )}
                      {view.side} {selectedTrend.hashtag.replace('#', '')}
                    </h3>
                    <div className={`text-3xl font-bold ${
                      view.side === 'for' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {view.percentage}%
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          view.side === 'for' ? 'bg-green-400' : 'bg-red-400'
                        }`}
                        style={{ width: `${view.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Quotes */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <Quote className="w-4 h-4 mr-1" />
                      Key Arguments
                    </h4>
                    <div className="space-y-2">
                      {view.keyQuotes.map((quote, i) => (
                        <div key={i} className="text-sm text-gray-400 italic">
                          "{quote}"
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Influencers */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Top Influencers
                    </h4>
                    <div className="space-y-3">
                      {view.influencers.slice(0, 2).map((influencer, i) => (
                        <div key={i} className="bg-black/20 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{influencer.name}</span>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-cyber-teal rounded-full" />
                              <span className="text-xs text-gray-400">{influencer.credibility}% credibility</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-400 italic">"{influencer.quote}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Historical Parallels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-cyber-teal" />
                Historical Conflict Parallels
              </h3>
              
              <div className="space-y-4">
                {historicalParallels.map((parallel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium">{parallel.event}</h4>
                        <span className="text-sm bg-cyber-teal/20 text-cyber-teal px-2 py-1 rounded">
                          {parallel.similarity}% similar
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{parallel.description}</p>
                    </div>
                    <div className="ml-4">
                      <div className="w-16 h-2 bg-gray-700 rounded-full">
                        <div
                          className="h-2 bg-cyber-teal rounded-full transition-all duration-1000"
                          style={{ width: `${parallel.similarity}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 bg-cyber-purple/5 border-cyber-purple/20"
            >
              <h3 className="text-xl font-semibold mb-4 text-cyber-purple">
                AI Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Monitor Closely</h4>
                  <p className="text-sm text-gray-400">
                    High controversy score ({selectedTrend.controversy}%) suggests rapid sentiment shifts possible
                  </p>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Engagement Strategy</h4>
                  <p className="text-sm text-gray-400">
                    Focus on moderate voices to bridge the {Math.abs(opposingViews[0]?.percentage - opposingViews[1]?.percentage)}% gap
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConflictDetector;