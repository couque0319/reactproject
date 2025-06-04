// src/components/Auth/SignupForm.jsx
import React, { useState } from 'react';

function SignupForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const res = await fetch('http://localhost/reactproject/api/signup.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success) {
      alert('회원가입 완료! 로그인해주세요.');
      onClose();
    } else {
      alert(data.message || '회원가입 실패');
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
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default SignupForm;
