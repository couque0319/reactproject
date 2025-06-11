import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ onLoginClick }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/reactproject/api/session_status.php', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
      console.log("session_status 응답:", data);
      if (data.loggedIn) {
       // user 관련 정보만 따로 저장
       setUser({ username: data.username, role: data.role });
     }
    });
  }, []);

  const handleLogout = () => {
    fetch('/reactproject/api/logout.php', {
      credentials: 'include'
    }).then(() => {
      setUser(null);
      window.location.reload();
    });
  };

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <Link to="/">
            <span role="img" aria-label="controller">🎮</span> <strong>GameReview Hub</strong>
          </Link>
        </div>

        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/games">Games</Link>
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}

          {user ? (
            <>
              <span className="username">👤 {user.nickname}</span>
              <Link to="/profile">
                <button className="header-button">Profile</button>
              </Link>
              <button className="header-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="header-button" onClick={onLoginClick}>Register</button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
