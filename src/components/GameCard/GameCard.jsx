import React from 'react';
import './GameCard.css';
import { Link } from 'react-router-dom';

function getScoreClass(score) {
  if (score >= 75) return 'high';
  if (score >= 50) return 'mid';
  return 'low';
}

function GameCard({ game }) {
  return (
    <div className="game-card">
      <Link to={`/games/${game.id}`}>
        <img src={game.image_url} alt={game.title} className="game-image" />
        <h3 className="game-title">{game.title}</h3>
      </Link>

      <p className="description">
        {game.description ? game.description.slice(0, 100) + '...' : ''}
      </p>
      <p className="meta-score" data-score={getScoreClass(game.meta_score)}>
        메타 점수: {game.meta_score}
      </p>
      <p className="user-score">유저 점수: {game.user_score}</p>
    </div>
  );
}

export default GameCard;
