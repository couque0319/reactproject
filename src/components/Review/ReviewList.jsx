// ReviewList.jsx
import React, { useEffect, useState } from 'react';
import './ReviewList.css';

function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    fetch(`/reactproject/api/get_reviews.php?game_id=${gameId}`)
      .then(res => res.json())
      .then(setReviews);

    fetch('/reactproject/api/session_status.php', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setCurrentUser(data.nickname);
        }
      });
  }, [gameId]);

  const handleDelete = (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    fetch('/reactproject/api/delete_review.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setReviews(reviews.filter(r => r.id !== id));
        } else {
          alert('삭제에 실패했습니다.');
        }
      });
  };

  if (reviews.length === 0) {
    return <p className="no-review">작성된 리뷰가 없습니다.</p>;
  }

  return (
    <div className="review-list">
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <div className={`review-score score-${Math.floor(review.rating)}`}>
            {review.rating}
          </div>
          <div className="review-info">
            <div className="review-meta">
              <strong>{review.nickname}</strong>
              <small>{review.created_at}</small>
            </div>
            <p className="review-content">{review.content}</p>
            {currentUser === review.nickname && (
              <div className="review-actions">
                <button onClick={() => handleDelete(review.id)}>삭제</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
