import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Eye, Globe, Moon, Sun, ArrowRight } from 'lucide-react';

export const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>
        
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {darkMode ? <Moon className="w-5 h-5 text-gray-600 mr-3" /> : <Sun className="w-5 h-5 text-gray-600 mr-3" />}
              <span>Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-gray-600 mr-3" />
              <span>Push Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Language */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Language</h2>
          <div className="flex items-center">
            <Globe className="w-5 h-5 text-gray-600 mr-3" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
              <option value="bn">বাংলা</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        </motion.div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Lock className="w-5 h-5 text-gray-600 mr-3" />
                <span>Change Password</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-gray-600 mr-3" />
                <span>Two-Factor Authentication</span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 