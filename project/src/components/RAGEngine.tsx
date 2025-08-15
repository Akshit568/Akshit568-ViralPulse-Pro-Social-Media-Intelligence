import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Search, Database, Lightbulb, FileText, BarChart3 } from 'lucide-react';
import { useTrend } from '../context/TrendContext';

interface RAGResult {
  step: 'retrieve' | 'contextualize' | 'source';
  data: any;
}

interface Chunk {
  id: string;
  content: string;
  relevanceScore: number;
  source: string;
  timestamp: string;
}

const RAGEngine: React.FC = () => {
  const { selectedTrend } = useTrend();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [results, setResults] = useState<RAGResult[]>([]);
  const [showSources, setShowSources] = useState(false);

  const processRAG = async () => {
    if (!selectedTrend) return;

    setIsProcessing(true);
    setCurrentStep(0);
    setResults([]);

    // Step 1: Retrieve
    setTimeout(() => {
      setCurrentStep(1);
      const mockChunks: Chunk[] = [
        {
          id: '1',
          content: `Recent discussions around ${selectedTrend.hashtag} have intensified, with community sentiment showing significant polarization...`,
          relevanceScore: 0.94,
          source: '@TechAnalyst2023',
          timestamp: '2 hours ago'
        },
        {
          id: '2',
          content: `The controversy surrounding ${selectedTrend.hashtag} stems from fundamental disagreements about implementation and oversight...`,
          relevanceScore: 0.89,
          source: '@PolicyExpert',
          timestamp: '4 hours ago'
        },
        {
          id: '3',
          content: `Market reaction to ${selectedTrend.hashtag} has been volatile, with stakeholders expressing concerns about long-term implications...`,
          relevanceScore: 0.87,
          source: '@MarketWatch',
          timestamp: '6 hours ago'
        },
        {
          id: '4',
          content: `Community leaders are calling for more transparency regarding ${selectedTrend.hashtag} and its potential impact on users...`,
          relevanceScore: 0.85,
          source: '@CommunityVoice',
          timestamp: '8 hours ago'
        },
        {
          id: '5',
          content: `International perspectives on ${selectedTrend.hashtag} reveal cultural differences in approach and acceptance...`,
          relevanceScore: 0.82,
          source: '@GlobalInsights',
          timestamp: '12 hours ago'
        }
      ];

      setResults(prev => [...prev, { step: 'retrieve', data: mockChunks }]);
    }, 1000);

    // Step 2: Contextualize
    setTimeout(() => {
      setCurrentStep(2);
      const contextData = {
        culturalOrigin: {
          region: selectedTrend.region,
          description: 'Originated from tech communities, spread through mainstream social media',
          keyInfluencers: ['Tech Leaders', 'Policy Makers', 'General Public']
        },
        sentiment: {
          positive: Math.max(0, (selectedTrend.sentiment + 1) * 50),
          negative: Math.max(0, (1 - selectedTrend.sentiment) * 50),
          neutral: 20
        },
        toxicity: {
          level: selectedTrend.controversy > 80 ? 'HIGH' : selectedTrend.controversy > 60 ? 'MODERATE' : 'LOW',
          score: selectedTrend.controversy
        },
        memeEvolution: [
          { phase: 'Emergence', date: '2 days ago', description: 'Initial discussions in tech forums' },
          { phase: 'Amplification', date: '1 day ago', description: 'Picked up by major influencers' },
          { phase: 'Polarization', date: '12 hours ago', description: 'Clear opposing camps formed' },
          { phase: 'Mainstream', date: '6 hours ago', description: 'Traditional media coverage began' }
        ]
      };

      setResults(prev => [...prev, { step: 'contextualize', data: contextData }]);
    }, 2500);

    // Step 3: Source
    setTimeout(() => {
      setCurrentStep(3);
      setIsProcessing(false);
      
      const sourceData = {
        totalSources: 847,
        verifiedSources: 623,
        averageCredibility: 78.5,
        timeRange: '48 hours'
      };

      setResults(prev => [...prev, { step: 'source', data: sourceData }]);
    }, 4000);
  };

  useEffect(() => {
    if (selectedTrend) {
      processRAG();
    }
  }, [selectedTrend]);

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return Search;
      case 2: return Brain;
      case 3: return FileText;
      default: return Database;
    }
  };

  const getStepColor = (step: number) => {
    if (step <= currentStep) return 'text-cyber-purple';
    return 'text-gray-500';
  };

  if (!selectedTrend) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <Brain className="w-16 h-16 text-cyber-purple mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-semibold mb-2">RAG Deep Dive Engine</h2>
          <p className="text-gray-400">Select a trending topic to begin advanced analysis</p>
        </div>
      </div>
    );
  }

  const retrieveData = results.find(r => r.step === 'retrieve')?.data as Chunk[];
  const contextData = results.find(r => r.step === 'contextualize')?.data;
  const sourceData = results.find(r => r.step === 'source')?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8 text-cyber-purple" />
          <div>
            <h1 className="text-3xl font-bold">RAG Deep Dive Engine</h1>
            <p className="text-gray-400">Retrieval-Augmented Generation Analysis</p>
          </div>
        </div>

        <div className="glass-card p-4 inline-flex items-center space-x-4">
          <span className="text-gray-400">Analyzing:</span>
          <span className="text-xl font-semibold text-cyber-purple">{selectedTrend.hashtag}</span>
          <button 
            onClick={processRAG}
            className="px-4 py-2 bg-cyber-purple/20 text-cyber-purple rounded-lg hover:bg-cyber-purple/30 transition-colors"
          >
            Re-analyze
          </button>
        </div>
      </motion.div>

      {/* 3-Step Process */}
      <div className="glass-card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-cyber-teal" />
          3-Step Analysis Pipeline
        </h2>

        <div className="flex items-center justify-between">
          {[
            { num: 1, title: 'Retrieve', desc: 'Top 5 chunks from Chroma DB' },
            { num: 2, title: 'Contextualize', desc: 'Mistral-7B generates insights' },
            { num: 3, title: 'Source', desc: 'Show source posts & chunks' }
          ].map((step, index) => {
            const StepIcon = getStepIcon(step.num);
            const isActive = currentStep >= step.num;

            return (
              <div key={step.num} className="flex flex-col items-center flex-1">
                <div className={`
                  w-12 h-12 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-300
                  ${isActive 
                    ? 'border-cyber-purple bg-cyber-purple/20' 
                    : 'border-gray-600 bg-gray-800'
                  }
                `}>
                  {currentStep === step.num && isProcessing ? (
                    <div className="w-6 h-6 border-2 border-cyber-purple/30 border-t-cyber-purple rounded-full animate-spin" />
                  ) : (
                    <StepIcon className={`w-5 h-5 ${getStepColor(step.num)}`} />
                  )}
                </div>
                <h3 className={`font-medium mb-1 ${getStepColor(step.num)}`}>
                  {step.num}. {step.title}
                </h3>
                <p className="text-xs text-gray-500 text-center">{step.desc}</p>
                
                {index < 2 && (
                  <div className={`
                    w-full h-0.5 mt-4 transition-colors duration-300
                    ${currentStep > step.num ? 'bg-cyber-purple' : 'bg-gray-600'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {retrieveData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Search className="w-5 h-5 mr-2 text-cyber-purple" />
                Retrieved Chunks (Top 5)
              </h3>
              <button
                onClick={() => setShowSources(!showSources)}
                className="text-sm text-cyber-teal hover:text-cyber-teal/80 transition-colors"
              >
                {showSources ? 'Hide' : 'View'} Chunk Sources
              </button>
            </div>

            <div className="space-y-4">
              {retrieveData.map((chunk, index) => (
                <motion.div
                  key={chunk.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/20 rounded-lg p-4 border-l-4 border-l-cyber-purple"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm bg-cyber-purple/20 text-cyber-purple px-2 py-1 rounded">
                        Score: {chunk.relevanceScore}
                      </span>
                      <span className="text-sm text-gray-400">{chunk.source}</span>
                    </div>
                    <span className="text-xs text-gray-500">{chunk.timestamp}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{chunk.content}</p>
                  
                  <AnimatePresence>
                    {showSources && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-3 border-t border-gray-600"
                      >
                        <div className="text-xs text-gray-400">
                          <span className="font-medium">Chunk ID:</span> {chunk.id} • 
                          <span className="font-medium"> Tokens:</span> 512 • 
                          <span className="font-medium"> Method:</span> Sliding Window
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {contextData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Cultural Origin & Sentiment */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-cyber-teal" />
                Cultural Analysis
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Origin Summary</h4>
                  <p className="text-sm text-gray-400 mb-3">{contextData.culturalOrigin.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {contextData.culturalOrigin.keyInfluencers.map((influencer: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-cyber-teal/20 text-cyber-teal text-xs rounded">
                        {influencer}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Sentiment Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400">Positive</span>
                      <span>{contextData.sentiment.positive.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-green-400 rounded-full transition-all duration-1000"
                        style={{ width: `${contextData.sentiment.positive}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-red-400">Negative</span>
                      <span>{contextData.sentiment.negative.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 bg-red-400 rounded-full transition-all duration-1000"
                        style={{ width: `${contextData.sentiment.negative}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Toxicity Alert</h4>
                  <div className={`
                    px-3 py-2 rounded-lg text-sm
                    ${contextData.toxicity.level === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                      contextData.toxicity.level === 'MODERATE' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }
                  `}>
                    {contextData.toxicity.level} ({contextData.toxicity.score}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Meme Evolution Timeline */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-cyber-purple" />
                Evolution Timeline
              </h3>
              
              <div className="space-y-4">
                {contextData.memeEvolution.map((phase: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-3 h-3 bg-cyber-purple rounded-full mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{phase.phase}</h4>
                        <span className="text-xs text-gray-500">{phase.date}</span>
                      </div>
                      <p className="text-sm text-gray-400">{phase.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {sourceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-cyber-green" />
              Source Verification
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyber-green">{sourceData.totalSources}</div>
                <div className="text-sm text-gray-400">Total Sources</div>
              </div>
              <div className="bg-black/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyber-teal">{sourceData.verifiedSources}</div>
                <div className="text-sm text-gray-400">Verified</div>
              </div>
              <div className="bg-black/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyber-purple">{sourceData.averageCredibility}%</div>
                <div className="text-sm text-gray-400">Avg Credibility</div>
              </div>
              <div className="bg-black/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">{sourceData.timeRange}</div>
                <div className="text-sm text-gray-400">Time Range</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RAGEngine;