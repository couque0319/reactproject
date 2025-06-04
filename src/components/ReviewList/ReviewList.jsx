import React, { useEffect, useState } from 'react';

function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/reactproject/api/get_reviews.php?game_id=${gameId}`)        //여기서 경로를 수정해야됨
      .then(response => response.json())
      .then(data => setReviews(data));
  }, [gameId]);

  return (
    <div>
      <h3>리뷰 목록</h3>
      {reviews.map(review => (
        <div key={review.id}>
          <p><strong>{review.nickname}</strong> - 평점: {review.rating}</p>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
