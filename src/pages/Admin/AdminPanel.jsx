// ✅ AdminPanel.jsx (src/pages/AdminPanel.jsx)
import React, { useEffect, useState } from 'react';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost/reactproject/api/get_users.php')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const changeRole = (userId, newRole) => {
    fetch('http://localhost/reactproject/api/update_user_role.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, role: newRole })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('권한 변경 완료');
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      } else {
        alert('변경 실패');
      }
    });
  };

  const deleteReview = (reviewId) => {
    fetch('http://localhost/reactproject/api/delete_review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review_id: reviewId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) alert('리뷰 삭제 완료');
      else alert('리뷰 삭제 실패');
    });
  };

  return (
    <div>
      <h2>관리자 패널</h2>
      <table border="1">
        <thead>
          <tr>
            <th>아이디</th><th>이름</th><th>권한</th><th>권한 변경</th><th>작업</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => changeRole(user.id, 'user')}>user</button>
                <button onClick={() => changeRole(user.id, 'admin')}>admin</button>
              </td>
              <td>
                {/* 이후: 해당 사용자의 리뷰 삭제 등 추가 가능 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;