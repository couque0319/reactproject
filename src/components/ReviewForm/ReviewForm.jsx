import React, { useState } from 'react';

function ReviewForm({ gameId }) {
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost/reactproject/api/add_review.php', {       // 여기서 경로를 수정해야됨
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: gameId, nickname, rating, content })
    })
      .then(response => response.text())
      .then(() => {
        setNickname('');
        setRating('');
        setContent('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="평점"
        value={rating}
        onChange={e => setRating(e.target.value)}
        required
        min="0"
        max="10"
      />
      <textarea
        placeholder="리뷰를 작성하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">리뷰 등록</button>
    </form>
  );
}

export default ReviewForm;
