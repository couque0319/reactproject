import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GameList.css';

function GameList() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/reactproject/api/get_games.php')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    return res.json();
  })
  .then(data => setGames(data))
  .catch(err => console.error("게임 데이터를 불러오는 중 오류 발생:", err));

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
          <Link to={`/games/${game.id}`} key={game.id} className="horizontal-game-card-link">
            <div className="horizontal-game-card">
              <img src={game.image_url} alt={game.title} className="horizontal-game-image" />
              <div className="horizontal-game-info">
                <h3 className="horizontal-game-title">{game.title}</h3>
                <p className="horizontal-description">{game.description?.slice(0, 120)}...</p>
                <p className="meta-score">메타 점수: {game.meta_score}</p>
                <p className="user-score">유저 점수: {game.user_score}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default GameList;
