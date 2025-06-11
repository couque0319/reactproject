// SignupForm.jsx
import React, { useState } from 'react';

function SignupForm({ onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !password || !nickname) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/reactproject/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, nickname })
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ 회원가입 완료! 로그인해주세요.');
        onClose();
      } else {
        alert(data.message || '❌ 회원가입 실패');
      }
    } catch (error) {
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
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />
      <button onClick={handleSignup} className="auth-button" disabled={loading}>
        {loading ? '처리 중...' : '회원가입'}
      </button>
    </div>
  );
}

export default SignupForm;
