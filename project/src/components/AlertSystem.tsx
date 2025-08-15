import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Plus, Zap, Mail, Smartphone, Settings, Trash2, Edit } from 'lucide-react';

interface Alert {
  id: string;
  name: string;
  condition: string;
  value: number;
  type: 'controversy' | 'volume' | 'sentiment' | 'growth';
  methods: ('email' | 'sms' | 'push')[];
  active: boolean;
  triggered: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'warning' | 'alert' | 'info';
}

const AlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      name: 'AI Ethics High Controversy',
      condition: '#AIethics controversy score',
      value: 80,
      type: 'controversy',
      methods: ['email', 'sms'],
      active: true,
      triggered: 3
    },
    {
      id: '2',
      name: 'Crypto Volume Spike',
      condition: '#CryptoRegulation volume',
      value: 100000,
      type: 'volume',
      methods: ['push'],
      active: true,
      triggered: 1
    },
    {
      id: '3',
      name: 'Climate Sentiment Drop',
      condition: '#ClimateAction sentiment',
      value: -0.3,
      type: 'sentiment',
      methods: ['email'],
      active: false,
      triggered: 0
    }
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'High Controversy Alert',
      message: '#AIethics controversy score reached 85% - Opposition camps forming',
      timestamp: '2 hours ago',
      type: 'alert'
    },
    {
      id: '2',
      title: 'Volume Spike Detected',
      message: '#CryptoRegulation mentions increased by 150% in the last hour',
      timestamp: '4 hours ago',
      type: 'warning'
    },
    {
      id: '3',
      title: 'Trend Analysis Complete',
      message: 'Weekly social media intelligence report is ready for review',
      timestamp: '1 day ago',
      type: 'info'
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: '',
    hashtag: '',
    type: 'controversy' as Alert['type'],
    value: 80,
    methods: ['email'] as Alert['methods']
  });

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'controversy': return <Zap className="w-4 h-4" />;
      case 'volume': return <Bell className="w-4 h-4" />;
      case 'sentiment': return <Settings className="w-4 h-4" />;
      case 'growth': return <Settings className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'controversy': return 'text-orange-400 bg-orange-500/20';
      case 'volume': return 'text-blue-400 bg-blue-500/20';
      case 'sentiment': return 'text-green-400 bg-green-500/20';
      case 'growth': return 'text-purple-400 bg-purple-500/20';
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'alert': return 'border-l-red-400 bg-red-500/10';
      case 'warning': return 'border-l-orange-400 bg-orange-500/10';
      case 'info': return 'border-l-blue-400 bg-blue-500/10';
    }
  };

  const createAlert = () => {
    if (!newAlert.name || !newAlert.hashtag) return;

    const alert: Alert = {
      id: Date.now().toString(),
      name: newAlert.name,
      condition: `${newAlert.hashtag} ${newAlert.type}`,
      value: newAlert.value,
      type: newAlert.type,
      methods: newAlert.methods,
      active: true,
      triggered: 0
    };

    setAlerts(prev => [...prev, alert]);
    setNewAlert({ name: '', hashtag: '', type: 'controversy', value: 80, methods: ['email'] });
    setShowCreateForm(false);
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Bell className="w-8 h-8 text-cyber-purple" />
            <div>
              <h1 className="text-3xl font-bold">Pro Alert System</h1>
              <p className="text-gray-400">Custom triggers and notifications</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-cyber-purple hover:bg-cyber-purple/80 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Alert</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-cyber-green">{alerts.filter(a => a.active).length}</div>
            <div className="text-sm text-gray-400">Active Alerts</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-cyber-teal">{alerts.reduce((sum, a) => sum + a.triggered, 0)}</div>
            <div className="text-sm text-gray-400">Total Triggered</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-cyber-purple">{notifications.length}</div>
            <div className="text-sm text-gray-400">Recent Notifications</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-2xl font-bold text-orange-400">92%</div>
            <div className="text-sm text-gray-400">Accuracy Rate</div>
          </div>
        </div>
      </motion.div>

      {/* Create Alert Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-6">Create New Alert</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Alert Name</label>
                  <input
                    type="text"
                    value={newAlert.name}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:border-cyber-purple focus:outline-none"
                    placeholder="e.g., AI Ethics Monitor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Hashtag</label>
                  <input
                    type="text"
                    value={newAlert.hashtag}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, hashtag: e.target.value }))}
                    className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:border-cyber-purple focus:outline-none"
                    placeholder="e.g., #AIethics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Condition Type</label>
                  <select
                    value={newAlert.type}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, type: e.target.value as Alert['type'] }))}
                    className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:border-cyber-purple focus:outline-none"
                  >
                    <option value="controversy">Controversy Score</option>
                    <option value="volume">Volume</option>
                    <option value="sentiment">Sentiment</option>
                    <option value="growth">Growth Rate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Threshold ({newAlert.type === 'volume' ? 'mentions' : newAlert.type === 'sentiment' ? 'score' : '%'})
                  </label>
                  <input
                    type="number"
                    value={newAlert.value}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, value: Number(e.target.value) }))}
                    className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:border-cyber-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notification Methods</label>
                  <div className="space-y-2">
                    {[
                      { id: 'email', icon: Mail, label: 'Email' },
                      { id: 'sms', icon: Smartphone, label: 'SMS' },
                      { id: 'push', icon: Bell, label: 'Push Notification' }
                    ].map(method => {
                      const Icon = method.icon;
                      return (
                        <label key={method.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newAlert.methods.includes(method.id as any)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewAlert(prev => ({ ...prev, methods: [...prev.methods, method.id as any] }));
                              } else {
                                setNewAlert(prev => ({ ...prev, methods: prev.methods.filter(m => m !== method.id) }));
                              }
                            }}
                            className="rounded border-gray-600"
                          />
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{method.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={createAlert}
                  className="flex-1 px-4 py-2 bg-cyber-purple hover:bg-cyber-purple/80 rounded-lg transition-colors"
                >
                  Create Alert
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Alerts */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-4 ${alert.active ? '' : 'opacity-50'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(alert.type)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{alert.name}</h3>
                      <p className="text-sm text-gray-400">{alert.condition} {">"} {alert.value}{alert.type === 'volume' ? '' : alert.type === 'sentiment' ? '' : '%'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleAlert(alert.id)}
                      className={`w-10 h-6 rounded-full transition-colors ${
                        alert.active ? 'bg-cyber-green' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        alert.active ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">Methods:</span>
                    <div className="flex space-x-2">
                      {alert.methods.map(method => {
                        const Icon = method === 'email' ? Mail : method === 'sms' ? Smartphone : Bell;
                        return (
                          <Icon key={method} className="w-4 h-4 text-cyber-teal" />
                        );
                      })}
                    </div>
                  </div>
                  <span className="text-gray-400">
                    Triggered: <span className="text-cyber-purple font-medium">{alert.triggered}x</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-4 border-l-4 ${getNotificationColor(notification.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                </div>
                <p className="text-sm text-gray-400">{notification.message}</p>
              </motion.div>
            ))}
          </div>

          {/* Mock SMS/Email Preview */}
          <div className="mt-6 glass-card p-4 bg-cyber-purple/5 border-cyber-purple/20">
            <h3 className="font-medium mb-3 text-cyber-purple">Sample Alert Digest</h3>
            <div className="text-sm space-y-2">
              <div className="bg-black/20 rounded p-3">
                <div className="text-xs text-gray-500 mb-1">📧 Email Preview</div>
                <div className="font-medium">🚨 ViralPulse Alert: High Controversy Detected</div>
                <div className="text-gray-400">#AIethics controversy score: 87% (+12% in 2hrs)</div>
              </div>
              <div className="bg-black/20 rounded p-3">
                <div className="text-xs text-gray-500 mb-1">📱 SMS Preview</div>
                <div className="font-medium">ViralPulse: #CryptoRegulation volume spike 150% - View analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;