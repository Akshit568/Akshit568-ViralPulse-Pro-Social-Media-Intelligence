import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import WarRoom from './components/WarRoom';
import ConflictDetector from './components/ConflictDetector';
import RAGEngine from './components/RAGEngine';
import AlertSystem from './components/AlertSystem';
import TechnicalShowcase from './components/TechnicalShowcase';
import { TrendProvider } from './context/TrendContext';

function App() {
  const [activeSection, setActiveSection] = useState('warroom');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-cyber-purple/30 border-t-cyber-purple rounded-full mx-auto mb-4"
          />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold bg-gradient-cyber bg-clip-text text-transparent"
          >
            ViralPulse Pro
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-400 mt-2"
          >
            Initializing Social Media Intelligence...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <TrendProvider>
      <div className="min-h-screen bg-gray-900">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <main className="pt-20">
          <AnimatePresence mode="wait">
            {activeSection === 'warroom' && (
              <motion.div
                key="warroom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <WarRoom />
              </motion.div>
            )}
            
            {activeSection === 'conflict' && (
              <motion.div
                key="conflict"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ConflictDetector />
              </motion.div>
            )}
            
            {activeSection === 'rag' && (
              <motion.div
                key="rag"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RAGEngine />
              </motion.div>
            )}
            
            {activeSection === 'alerts' && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AlertSystem />
              </motion.div>
            )}
            
            {activeSection === 'technical' && (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TechnicalShowcase />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="bg-black/50 border-t border-white/10 mt-20 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 mb-2">
              "ViralPulse predicted the #Xbox backlash 12hrs early!" — @GamingAnalyst
            </p>
            <p className="text-sm text-gray-500">
              Technical Demo • Built with React + AI-Powered Analytics
            </p>
          </div>
        </footer>
      </div>
    </TrendProvider>
  );
}

export default App;