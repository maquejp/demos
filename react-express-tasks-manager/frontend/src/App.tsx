import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentUser] = useState(null);
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate to="/" replace />
          ) : (
            <div className="min-h-screen bg-gray-50">
              <LoginPage />
              <Footer></Footer>
            </div>
          )
        }
      />

      {/* Protected routes - require authentication */}
      <Route
        path="/*"
        element={
          currentUser ? (
            <div className="min-h-screen bg-gray-50">
              <Header></Header>
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<WelcomePage />} />
                </Routes>
              </main>
              <Footer></Footer>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
