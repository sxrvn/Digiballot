import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Home, Users, Vote, BarChart3, HelpCircle, User, Settings as SettingsIcon, ChevronDown, ArrowLeft, Bell, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../App';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Political Parties', icon: Users, path: '/parties' },
    { name: 'Vote Now', icon: Vote, path: '/vote' },
    { name: 'Results', icon: BarChart3, path: '/results' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
  ];

  const showBackButton = location.pathname !== '/' && location.pathname !== '/landing';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/80 z-50 border-b border-gray-200/80">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-[70px]">
            <div className="flex items-center gap-4 -ml-2">
              {showBackButton && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </motion.button>
              )}
              <Link 
                to="/dashboard" 
                className="flex items-center group" 
                onClick={(e) => {
                  if (location.pathname === '/dashboard') {
                    e.preventDefault();
                  }
              }}>
                <div className="flex flex-col">
                  <span className="text-2xl font-rajdhani font-bold bg-gradient-to-r from-gray-700 via-gray-800 to-black text-transparent bg-clip-text">
                    DigiBallot
                  </span>
                  <div className="text-xs text-gray-500">Secure Digital Voting</div>
                </div>
                <img 
                  src="https://www.eci.gov.in/newimg/eci-logo.svg"
                  alt="Election Commission of India"
                  className="h-10 w-auto ml-3 transition-transform group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="flex items-center gap-6 -mr-2">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full hover:bg-gray-100/80 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
              <div className="h-6 w-px bg-gray-200"></div>
              <div className="relative">
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-medium">
                    RK
                  </div>
                  <span className="font-medium">Rahul Kumar</span>
                  <ChevronDown size={16} className={`transform transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white/80 backdrop-blur-md rounded-xl shadow-lg py-2 z-50 border border-gray-100"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors"
                      >
                        <User size={16} className="mr-3" />
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100/80 transition-colors"
                      >
                        <SettingsIcon size={16} className="mr-3" />
                        Settings
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/80 transition-colors"
                      >
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen pt-16">
        <aside className="w-64 fixed h-full bg-white shadow-lg">
          <div className="h-full py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={`
                        flex items-center px-4 py-3 text-sm font-medium rounded-lg
                        ${isActive 
                          ? 'bg-gradient-to-r from-gray-800 to-black text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <footer className="ml-64 bg-gradient-to-r from-gray-900 to-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <img
                src="https://www.eci.gov.in/newimg/eci-logo.svg"
                alt="Election Commission of India"
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="mt-3 text-sm leading-relaxed opacity-90">
                Empowering democracy through secure digital voting. Making the electoral process more accessible, transparent, and efficient.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-3 space-y-3">
                <li>
                  <Link to="/about" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm opacity-90 hover:opacity-100 transition-opacity">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="mt-3 space-y-3">
                <li className="text-sm">
                  <span className="block opacity-90">Email:</span>
                  <a href="mailto:support@digiballot.in" className="opacity-100 hover:underline">
                    support@digiballot.in
                  </a>
                </li>
                <li className="text-sm">
                  <span className="block opacity-90">Phone:</span>
                  <a href="tel:1800XXXXXXX" className="opacity-100 hover:underline">
                    1800-XXX-XXXX
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-500/30 text-center">
            <p className="text-sm opacity-90">
              © {new Date().getFullYear()} DigiBallot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}