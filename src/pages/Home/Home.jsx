// src/pages/Home/Home.jsx
import React, { useEffect, useState } from 'react';
import GameCard from '../../components/GameCard/GameCard';
import './Home.css';

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('/reactproject/api/get_games.php')
      .then(res => res.json())
      .then(data => {
        console.log("게임 데이터 개수:", data.length);
        console.log("샘플 게임 구조:", data[0]);
        setGames(data);
      })
      .catch(err => console.error("게임 데이터를 불러오는 중 오류:", err));
  }, []);

  return (
    <main className="home">
      <h2>최신 게임</h2>
      <div className="game-list">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}

export default Home;
