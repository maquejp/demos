import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import { useUser } from './hooks/useUser';
import TaskDetails from './components/dashboard/TaskDetails';

function App() {
  const { currentUser, loading } = useUser();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
        <Footer></Footer>
      </div>
    );
  }

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
                  <Route path="/tasks/:id" element={<TaskDetails />} />
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
