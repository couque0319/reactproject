// src/components/Auth/AuthModal.jsx
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './AuthModal.css';

function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>×</button>
        {mode === 'login' ? (
          <>
            <h2>로그인</h2>
            <LoginForm onClose={onClose} />
            <p onClick={() => setMode('signup')}>계정이 없으신가요? <strong>회원가입</strong></p>
          </>
        ) : (
          <>
            <h2>회원가입</h2>
            <SignupForm onClose={onClose} />
            <p onClick={() => setMode('login')}>이미 계정이 있으신가요? <strong>로그인</strong></p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
