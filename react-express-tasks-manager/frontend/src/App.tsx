import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header></Header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
