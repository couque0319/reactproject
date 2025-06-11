// src/pages/GameDetail/GameDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../../components/Review/ReviewList';
import ReviewForm from '../../components/Review/ReviewForm';
import './GameDetail.css';

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/reactproject/api/get_game.php?id=${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data?.error) {
          setError(data.error);
        } else {
          setGame(data);
        }
      })
      .catch(err => {
        console.error('게임 상세 정보 불러오기 실패:', err);
        setError('서버 오류가 발생했습니다.');
      });
  }, [id]);

  if (error) return <p className="game-detail-wrapper">⚠️ {error}</p>;
  if (!game) return <p className="game-detail-wrapper">로딩 중...</p>;

  return (
    <div className="game-detail-wrapper">
      <div className="game-detail">
        <h2>{game.title}</h2>
        <img src={game.image_url} alt={game.title} className="game-detail-image" />
        <p className="description">{game.description}</p>
        <p className="meta-score">메타 점수: {game.meta_score}</p>
        <p className="user-score">유저 점수: {game.user_score}</p>

        <h3>리뷰</h3>
        <ReviewList gameId={id} />
        <ReviewForm gameId={id} />
      </div>
    </div>
  );
}

export default GameDetail;
