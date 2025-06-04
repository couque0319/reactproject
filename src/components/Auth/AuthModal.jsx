// src/components/Auth/AuthModal.jsx
import React, { useState } from 'react';
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
            <form>
              <input type="text" placeholder="아이디" />
              <input type="password" placeholder="비밀번호" />
              <button type="submit">로그인</button>
            </form>
            <p onClick={() => setMode('signup')}>계정이 없으신가요? 회원가입</p>
          </>
        ) : (
          <>
            <h2>회원가입</h2>
            <form>
              <input type="text" placeholder="아이디" />
              <input type="password" placeholder="비밀번호" />
              <button type="submit">회원가입</button>
            </form>
            <p onClick={() => setMode('login')}>이미 계정이 있으신가요? 로그인</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
