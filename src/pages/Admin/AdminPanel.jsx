import React, { useEffect, useState } from 'react';
import './AdminPanel.css';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [selectedNickname, setSelectedNickname] = useState(null);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    fetch('/reactproject/api/get_users.php')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const changeRole = (userId, newRole) => {
    fetch('/reactproject/api/update_user_role.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, role: newRole })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('권한 변경 완료');
          // ✅ 상태에서 해당 유저의 role만 업데이트
          setUsers(prev =>
            prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
          );
        } else {
          alert('변경 실패');
          console.log(data.message);
        }
      });
  };

  const handleUserClick = (nickname) => {
    setSelectedNickname(nickname);
    fetch(`/reactproject/api/get_reviews_by_user.php?nickname=${nickname}`)
      .then(res => res.json())
      .then(setUserReviews);
  };

  const deleteReview = (reviewId) => {
    if (!window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) return;

    fetch('/reactproject/api/delete_review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: reviewId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('리뷰 삭제 완료');
          setUserReviews(prev => prev.filter(r => r.id !== reviewId));
        } else {
          alert('리뷰 삭제 실패');
        }
      });
  };

  return (
    <div className="admin-container">
      <h2>👑 관리자 패널</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>닉네임</th>
            <th>권한</th>
            <th>권한 변경</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <button
                  className="nickname-button"
                  onClick={() => handleUserClick(user.nickname)}
                >
                  {user.nickname}
                </button>
              </td>
              <td>{user.role}</td> {/* ✅ 현재 권한 표시 */}
              <td>
                <button
                  className="role-user"
                  onClick={() => changeRole(user.id, 'user')}
                >
                  user
                </button>
                <button
                  className="role-admin"
                  onClick={() => changeRole(user.id, 'admin')}
                >
                  admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedNickname && (
        <>
          <h3>📝 <span style={{ color: '#0ff' }}>{selectedNickname}</span> 님의 리뷰 목록</h3>
          {userReviews.length === 0 ? (
            <p>작성한 리뷰가 없습니다.</p>
          ) : (
            <div className="review-list">
              {userReviews.map(review => (
                <div className="review-card" key={review.id}>
                  <div className="review-card-header">
                    <div>
                      <p><strong>게임:</strong> {review.game_title}</p>
                      <p><strong>평점:</strong> {review.rating}</p>
                    </div>
                    <button
                      className="review-delete-btn"
                      onClick={() => deleteReview(review.id)}
                    >
                      리뷰 삭제
                    </button>
                  </div>
                  <p className="review-card-content">{review.content}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminPanel;
