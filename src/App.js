import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import AuthModal from './components/Auth/AuthModal';
import GameList from './pages/GameList/GameList';
import Home from './pages/Home/Home';
import GamePage from './pages/GameDetail/GameDetail';
import Profile from './pages/Profile/Profile';
import AdminPanel from './pages/Admin/AdminPanel';
import AIBar from './components/AIBar/AIBar'; // ✅ AIBar import

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const open = () => setShowAuthModal(true);
    window.addEventListener('open-auth-modal', open);
    return () => window.removeEventListener('open-auth-modal', open);
  }, []);

  return (
    <>
      <Header onLoginClick={() => setShowAuthModal(true)} />
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <AIBar /> {/* ✅ Routes 바깥에 위치시켜서 고정 컴포넌트로 만듦 */}
    </>
  );
}

export default App;
