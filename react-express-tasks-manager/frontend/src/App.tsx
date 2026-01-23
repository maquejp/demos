import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import { useUser } from './hooks/useUser';
import TaskDetails from './components/dashboard/TaskDetails';
import TaskForm from './components/dashboard/TaskForm';
import Loading from './components/Loading';

function App() {
  const { currentUser, loading } = useUser();

  // Show loading while checking authentication
  if (loading) {
    return <Loading message="Checking authentication..." />;
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
                  <Route path="/tasks/add" element={<TaskForm />} />
                  <Route path="/tasks/:id" element={<TaskDetails />} />
                  <Route path="/tasks/:id/edit" element={<TaskForm />} />
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
