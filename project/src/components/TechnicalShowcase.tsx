import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Database, Cpu, Zap, BarChart3, Code, Clock, CheckCircle } from 'lucide-react';

const TechnicalShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState('pipeline');

  const sections = [
    { id: 'pipeline', label: 'Pipeline Overview', icon: Database },
    { id: 'benchmarks', label: 'Performance', icon: BarChart3 },
    { id: 'architecture', label: 'Architecture', icon: Cpu },
    { id: 'algorithms', label: 'Algorithms', icon: Code },
  ];

  const pipelineSteps = [
    {
      step: 1,
      title: 'Data Ingestion',
      description: 'Real-time social media stream processing',
      tech: 'Apache Kafka + Stream Processing',
      metrics: '10M+ posts/day processed'
    },
    {
      step: 2,
      title: 'Preprocessing',
      description: 'Text cleaning, normalization, and tokenization',
      tech: 'Custom NLP Pipeline',
      metrics: '99.2% accuracy rate'
    },
    {
      step: 3,
      title: 'Embedding Generation',
      description: 'Sentence-Transformer model for semantic understanding',
      tech: 'all-MiniLM-L6-v2',
      metrics: '384-dimensional vectors'
    },
    {
      step: 4,
      title: 'Chunking Strategy',
      description: 'Sliding window approach for optimal retrieval',
      tech: 'Custom Implementation',
      metrics: '512 tokens with 50% overlap'
    },
    {
      step: 5,
      title: 'Vector Storage',
      description: 'High-performance vector database with HNSW indexing',
      tech: 'Chroma DB',
      metrics: '<5ms query latency'
    },
    {
      step: 6,
      title: 'RAG Retrieval',
      description: 'Semantic search with relevance scoring',
      tech: 'Cosine Similarity',
      metrics: 'Top-K retrieval (K=5)'
    }
  ];

  const benchmarkData = [
    { metric: 'Average Latency', value: '0.8s', description: 'End-to-end query processing', status: 'excellent' },
    { metric: 'RAGAS Score', value: '0.94', description: 'Retrieval quality assessment', status: 'excellent' },
    { metric: 'Accuracy Improvement', value: '42%', description: 'vs. keyword-based search', status: 'good' },
    { metric: 'Throughput', value: '1.2K QPS', description: 'Concurrent query handling', status: 'excellent' },
    { metric: 'Storage Efficiency', value: '87%', description: 'Vector compression ratio', status: 'good' },
    { metric: 'Uptime', value: '99.97%', description: 'System availability', status: 'excellent' }
  ];

  const algorithmSpecs = [
    {
      name: 'Conflict Detection Algorithm',
      description: 'Density-based clustering for opposition group identification',
      pseudocode: `function detectConflict(trend):
    embeddings = sentenceTransformer(posts)
    clusters = dbscanClustering(embeddings)
    pro, con = identifyOpposition(clusters)
    controversyScore = calculateVariance(pro, con)
    return controversyScore, extractKeyQuotes(pro, con)`
    },
    {
      name: 'Trend Virality Predictor',
      description: 'Machine learning model for viral potential assessment',
      pseudocode: `function predictVirality(trend):
    features = extractFeatures(trend)
    // [engagement_rate, sentiment_variance, influencer_count, 
    //  platform_diversity, temporal_acceleration]
    prediction = gradientBoostingModel.predict(features)
    confidence = calculateConfidence(prediction)
    return prediction, confidence`
    },
    {
      name: 'Semantic Similarity Matcher',
      description: 'Historical trend pattern matching using embeddings',
      pseudocode: `function findHistoricalParallels(currentTrend):
    currentEmbedding = encode(currentTrend)
    historicalEmbeddings = loadHistoricalDatabase()
    similarities = cosineSimilarity(currentEmbedding, historicalEmbeddings)
    topMatches = getTopK(similarities, k=5)
    return formatParallels(topMatches)`
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-500/20';
      case 'good': return 'text-blue-400 bg-blue-500/20';
      case 'warning': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Settings className="w-8 h-8 text-cyber-purple" />
          <div>
            <h1 className="text-3xl font-bold">Technical Showcase</h1>
            <p className="text-gray-400">Deep dive into the architecture and algorithms</p>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex space-x-2 glass-card p-2">
          {sections.map(section => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2
                  ${isActive 
                    ? 'bg-cyber-purple/20 text-cyber-purple' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="techActiveTab"
                    className="absolute inset-0 bg-cyber-purple/10 rounded-lg border border-cyber-purple/30"
                    initial={false}
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'pipeline' && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Pipeline Diagram */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Database className="w-5 h-5 mr-2 text-cyber-teal" />
                Data Processing Pipeline
              </h2>
              
              <div className="space-y-6">
                {pipelineSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-6"
                  >
                    {/* Step Number */}
                    <div className="w-10 h-10 bg-cyber-purple/20 rounded-full flex items-center justify-center text-cyber-purple font-bold">
                      {step.step}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 bg-black/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{step.title}</h3>
                        <span className="text-xs bg-cyber-teal/20 text-cyber-teal px-2 py-1 rounded">
                          {step.tech}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{step.description}</p>
                      <div className="text-xs text-cyber-green font-mono">{step.metrics}</div>
                    </div>

                    {/* Arrow */}
                    {index < pipelineSteps.length - 1 && (
                      <div className="text-gray-600">→</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <Zap className="w-8 h-8 text-cyber-purple mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Real-time Processing</h3>
                <p className="text-sm text-gray-400">Sub-second latency for live trend analysis</p>
              </div>
              <div className="glass-card p-6 text-center">
                <Database className="w-8 h-8 text-cyber-teal mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Scalable Architecture</h3>
                <p className="text-sm text-gray-400">Handles millions of posts with horizontal scaling</p>
              </div>
              <div className="glass-card p-6 text-center">
                <CheckCircle className="w-8 h-8 text-cyber-green mx-auto mb-3" />
                <h3 className="font-semibold mb-2">High Accuracy</h3>
                <p className="text-sm text-gray-400">94% RAGAS score for retrieval quality</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'benchmarks' && (
          <motion.div
            key="benchmarks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Performance Metrics */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-cyber-purple" />
                Performance Benchmarks
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benchmarkData.map((benchmark, index) => (
                  <motion.div
                    key={benchmark.metric}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black/20 rounded-lg p-6 text-center"
                  >
                    <div className={`text-3xl font-bold mb-2 ${getStatusColor(benchmark.status)}`}>
                      {benchmark.value}
                    </div>
                    <h3 className="font-semibold mb-2">{benchmark.metric}</h3>
                    <p className="text-sm text-gray-400">{benchmark.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
              <div className="space-y-4">
                {[
                  { method: 'ViralPulse RAG', score: 94, color: 'bg-cyber-purple' },
                  { method: 'Traditional Search', score: 67, color: 'bg-gray-600' },
                  { method: 'Keyword Matching', score: 52, color: 'bg-red-500' }
                ].map((item, index) => (
                  <div key={item.method} className="flex items-center space-x-4">
                    <div className="w-32 text-sm">{item.method}</div>
                    <div className="flex-1 bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                        className={`h-3 ${item.color} rounded-full`}
                      />
                    </div>
                    <div className="w-12 text-sm text-right">{item.score}%</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'architecture' && (
          <motion.div
            key="architecture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* System Architecture */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-cyber-teal" />
                System Architecture
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Frontend Layer */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-cyber-purple">Frontend Layer</h3>
                  <div className="space-y-2">
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">React + TypeScript</div>
                      <div className="text-xs text-gray-400">Interactive dashboard UI</div>
                    </div>
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">Framer Motion</div>
                      <div className="text-xs text-gray-400">Smooth animations</div>
                    </div>
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">TailwindCSS</div>
                      <div className="text-xs text-gray-400">Glassmorphism design</div>
                    </div>
                  </div>
                </div>

                {/* Backend Services */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-cyber-teal">Backend Services</h3>
                  <div className="space-y-2">
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">FastAPI</div>
                      <div className="text-xs text-gray-400">High-performance API</div>
                    </div>
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">Celery</div>
                      <div className="text-xs text-gray-400">Async task processing</div>
                    </div>
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">Redis</div>
                      <div className="text-xs text-gray-400">Caching & pub/sub</div>
                    </div>
                  </div>
                </div>

                {/* Data Layer */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-cyber-green">Data Layer</h3>
                  <div className="space-y-2">
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">Chroma DB</div>
                      <div className="text-xs text-gray-400">Vector database</div>
                    </div>
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">PostgreSQL</div>
                      <div className="text-xs text-gray-400">Metadata storage</div>
                    </div>
                    <div className="bg-black/20 rounded p-3">
                      <div className="font-medium">Apache Kafka</div>
                      <div className="text-xs text-gray-400">Stream processing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Infrastructure & Deployment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Container Orchestration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyber-green" />
                      <span>Kubernetes cluster management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyber-green" />
                      <span>Auto-scaling based on load</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyber-green" />
                      <span>Rolling deployments</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Monitoring & Observability</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyber-teal" />
                      <span>Prometheus metrics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyber-teal" />
                      <span>Grafana dashboards</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-cyber-teal" />
                      <span>Distributed tracing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'algorithms' && (
          <motion.div
            key="algorithms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Algorithm Specifications */}
            <div className="space-y-6">
              {algorithmSpecs.map((algorithm, index) => (
                <motion.div
                  key={algorithm.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Code className="w-5 h-5 text-cyber-purple" />
                    <h3 className="text-lg font-semibold">{algorithm.name}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{algorithm.description}</p>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">Pseudocode</span>
                      <span className="text-xs text-gray-500">Python-like</span>
                    </div>
                    <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                      <code>{algorithm.pseudocode}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Model Specifications */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-cyber-teal" />
                ML Model Specifications
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Embedding Model</h4>
                  <div className="bg-black/20 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model:</span>
                      <span>all-MiniLM-L6-v2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dimensions:</span>
                      <span>384</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Max Tokens:</span>
                      <span>512</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Inference Time:</span>
                      <span>~12ms</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Generation Model</h4>
                  <div className="bg-black/20 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Model:</span>
                      <span>Mistral-7B-Instruct</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Parameters:</span>
                      <span>7.3B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Context Length:</span>
                      <span>8192 tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span>~800ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TechnicalShowcase;