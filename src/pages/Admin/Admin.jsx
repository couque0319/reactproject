// src/pages/Admin.jsx
import React, { useEffect, useState } from 'react';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost/reactproject/api/get_users.php')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const updateRole = (username, newRole) => {
    fetch('http://localhost/reactproject/api/update_user_role.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, role: newRole })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
  };

  const deleteReview = (reviewId) => {
    fetch('http://localhost/reactproject/api/delete_review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
  };

  return (
    <div>
      <h2>회원 관리</h2>
      <table>
        <thead>
          <tr>
            <th>아이디</th>
            <th>권한</th>
            <th>권한 변경</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => updateRole(user.username, 'admin')}>Admin</button>
                <button onClick={() => updateRole(user.username, 'user')}>User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;