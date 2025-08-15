import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Brain, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'warroom', label: 'War Room', icon: Activity },
    { id: 'conflict', label: 'Conflict Detector™', icon: Target },
    { id: 'rag', label: 'RAG Engine', icon: Brain },
    { id: 'alerts', label: 'Pro Alerts', icon: Bell },
    { id: 'technical', label: 'Tech Showcase', icon: Settings },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-cyber rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-cyber bg-clip-text text-transparent">
                ViralPulse Pro
              </h1>
              <p className="text-xs text-gray-400">Social Media Intelligence</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    relative px-4 py-2 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-cyber-purple/20 text-cyber-purple' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-cyber-purple/10 rounded-lg border border-cyber-purple/30"
                      initial={false}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Live</span>
            </div>
            <div className="h-6 w-px bg-white/20"></div>
            <div className="text-sm text-gray-400">
              <span className="font-mono">23.7k</span> trends tracked
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;