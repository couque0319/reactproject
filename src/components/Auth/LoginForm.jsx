import React, { useState } from 'react';

function LoginForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/reactproject/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.success) {
       alert('로그인 성공');
        onClose();
        setTimeout(() => {
        window.location.reload();
    }, 100); // 짧은 지연으로 모달 정상 닫힘

      } else {
        alert(data.message || '로그인 실패');
      }
    } catch (err) {
      alert('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleLogin} className="auth-button" disabled={loading}>
        {loading ? '처리 중...' : '로그인'}
      </button>
    </div>
  );
}

export default LoginForm;
