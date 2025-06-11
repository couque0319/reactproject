// Profile.jsx
import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/reactproject/api/session_status.php', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setUser(data);

          // 사용자 리뷰 불러오기
          fetch(`/reactproject/api/get_reviews_by_user.php?nickname=${data.nickname}`)
            .then(res => res.json())
            .then(setReviews);
        }
      });
  }, []);

  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <div className="profile-wrapper">
      <aside className="profile-sidebar">
        <h2>My Profile</h2>
        <nav>
          <ul>
            <li className="active">MY RATINGS & REVIEWS</li>
            <li><Link to="#">MY ACCOUNT</Link></li>
            <li><Link to="#" onClick={() => {
              fetch('/reactproject/api/logout.php', {
                credentials: 'include'
              }).then(() => window.location.href = '/');
            }}>SIGN OUT</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="profile-main">
        <h3>My Ratings & Reviews</h3>
        {reviews.length === 0 ? (
          <p className="no-review">You haven’t rated anything yet</p>
        ) : (
          <ul className="review-list">
            {reviews.map(r => (
              <li key={r.id}>
                <Link to={`/games/${r.game_id}`}>
                  <strong>{r.game_title}</strong> - ⭐ {r.rating}
                </Link>
                <p>{r.content}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Profile;
