// ReviewForm.jsx
import React, { useEffect, useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ gameId, onReviewAdded }) {
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/reactproject/api/session_status.php', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn);
        if (data.loggedIn) {
          setNickname(data.nickname);  // ✅ 정확히 nickname 사용
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("로그인 후 이용이 가능합니다.");
      window.dispatchEvent(new Event('open-auth-modal'));
      return;
    }

    const res = await fetch('/reactproject/api/add_review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ game_id: gameId, nickname, rating, content })
    });

    const result = await res.json();
    if (result.success) {
      setRating('');
      setContent('');
      onReviewAdded();  // 리뷰 목록 갱신
    } else {
      alert('리뷰 등록에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <input type="text" placeholder="닉네임" value={nickname} disabled />
      <input
        type="number"
        placeholder="평점 (0~10)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        min="0"
        max="10"
      />
      <textarea
        placeholder="리뷰를 작성하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">리뷰 등록</button>
    </form>
  );
}

export default ReviewForm;
