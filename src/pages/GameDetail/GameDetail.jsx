import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './GameDetail.css';

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`/reactproject/api/get_game.php?id=${id}`)
      .then((res) => res.json())
      .then(setGame);
  }, [id]);

  if (!game) return <p>로딩 중...</p>;

  return (
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
  );
}

export default GameDetail;
