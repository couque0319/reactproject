import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('/reactproject/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('로그인 성공');
          localStorage.setItem('user', JSON.stringify(data.user));
          window.location.href = '/'; // 홈으로 이동
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default Login;
