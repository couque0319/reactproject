// GameCard.jsx
import React from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom';

function getScoreClass(score) {
  if (score >= 75) return 'high';
  if (score >= 50) return 'mid';
  return 'low';
}

function GameCard({ game }) {
  // 안전하게 데이터 fallback 설정
  const title = typeof game.title === 'string' ? game.title : '제목 없음';
  const description = typeof game.description === 'string' ? game.description.slice(0, 100) + '...' : '설명이 없습니다.';
  const metaScore = typeof game.meta_score === 'number' ? game.meta_score : 'N/A';
  const userScore = typeof game.user_score === 'number' ? game.user_score : 'N/A';

  return (
    <div className="game-card">
      <Link to={`/games/${game.id}`} className="game-link">
        {game.image_url ? (
          <img
            src={game.image_url}
            alt={title}
            className="game-image"
            onError={(e) => (e.target.style.display = 'none')}
          />
        ) : (
          <div style={{ height: '200px', background: '#444' }}>이미지 없음</div>
        )}
        <h3 className="game-title">{title}</h3>
      </Link>

      <p className="description">{description}</p>
      <p className="meta-score" data-score={getScoreClass(game.meta_score)}>
        메타 점수: {metaScore}
      </p>
      <p className="user-score">
        유저 점수: {userScore}
      </p>
    </div>
  );
}

export default GameCard;
