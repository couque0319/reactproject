// src/components/Auth/LoginForm.jsx
import React, { useState } from 'react';

function LoginForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('http://localhost/reactproject/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      alert('로그인 성공');
      onClose();
    } else {
      alert(data.message || '로그인 실패');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default LoginForm;