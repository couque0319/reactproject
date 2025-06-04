// src/pages/GameList/GameList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GameList.css';

function GameList() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/reactproject/api/get_games.php')
      .then(res => res.json())
      .then(data => setGames(data));
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="game-list-wrapper">
      <h2 className="page-title">전체 게임 목록</h2>
      <input
        type="text"
        className="search-input"
        placeholder="게임 제목 검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="game-horizontal-list">
        {filteredGames.map(game => (
          <div className="horizontal-game-card" key={game.id}>
            <img src={game.image_url} alt={game.title} className="horizontal-game-image" />
            <div className="horizontal-game-info">
              <h3 className="horizontal-game-title">{game.title}</h3>
              <p className="horizontal-description">{game.description?.slice(0, 120)}...</p>
              <p className="meta-score">메타 점수: {game.meta_score}</p>
              <p className="user-score">유저 점수: {game.user_score}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default GameList;
