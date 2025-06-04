import React, { useState } from 'react';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('manual'); // 'manual' or 'email'

  const handleManualSignup = () => {
    fetch('/reactproject/api/signup_manual.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('가입 완료');
        } else {
          alert(data.message);
        }
      });
  };

  const handleEmailSignup = () => {
    fetch('/reactproject/api/signup_email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('이메일 인증 완료');
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <div>
        <button onClick={() => setMode('manual')}>ID/비밀번호로 가입</button>
        <button onClick={() => setMode('email')}>이메일로 가입</button>
      </div>

      {mode === 'manual' && (
        <div>
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
          <button onClick={handleManualSignup}>가입하기</button>
        </div>
      )}

      {mode === 'email' && (
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={handleEmailSignup}>인증 메일 보내기</button>
        </div>
      )}
    </div>
  );
}

export default Signup;
