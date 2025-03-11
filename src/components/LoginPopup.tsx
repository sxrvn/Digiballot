import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onLogin }) => {
  const [formData, setFormData] = useState({
    voterId: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 isolate" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={onClose}
            style={{ position: 'fixed', zIndex: 9998 }}
          />
          <div className="fixed inset-0 flex items-center justify-center" style={{ position: 'fixed', zIndex: 9999 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="text-center mb-6">
                  <img
                    src="https://www.eci.gov.in/newimg/eci-logo.svg"
                    alt="ECI Logo"
                    className="h-16 mx-auto mb-4"
                  />
                  <h2 className="text-2xl font-bold text-gray-900">Login to Vote</h2>
                  <p className="mt-2 text-gray-600">Enter your credentials to access the voting system</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Voter ID
                    </label>
                    <input
                      type="text"
                      value={formData.voterId}
                      onChange={(e) => setFormData({ ...formData, voterId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your Voter ID"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
                      Forgot password?
                    </a>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Login
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-orange-600 hover:text-orange-700 font-medium">
                      Register now
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}; 