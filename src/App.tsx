import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { PoliticalParties } from './pages/PoliticalParties';
import { Vote } from './pages/Vote';
import { Results } from './pages/Results';
import { Help } from './pages/Help';
import { LandingPage } from './pages/LandingPage';
import { CandidateRegistration } from './pages/CandidateRegistration';
import { CandidateProfile } from './pages/CandidateProfile';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize auth state from localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <Layout>
                <Settings />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/parties" element={
            <PrivateRoute>
              <Layout>
                <PoliticalParties />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/vote" element={
            <PrivateRoute>
              <Layout>
                <Vote />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/results" element={
            <PrivateRoute>
              <Layout>
                <Results />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/help" element={
            <PrivateRoute>
              <Layout>
                <Help />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/candidate-registration" element={
            <PrivateRoute>
              <Layout>
                <CandidateRegistration />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/candidate-profile" element={
            <PrivateRoute>
              <Layout>
                <CandidateProfile />
              </Layout>
            </PrivateRoute>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;