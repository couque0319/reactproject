import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Header from './components/Header/Header';
import AuthModal from './components/Auth/AuthModal';

import Home from './pages/Home/Home';
import GamePage from './pages/GameDetail/GameDetail';
import Admin from './pages/Admin/Admin';
import AdminPanel from './pages/Admin/AdminPanel';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <Header onRegisterClick={() => setShowAuthModal(true)} />
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/panel" element={<AdminPanel />} />
      </Routes>
    </>
  );
}

export default App;
