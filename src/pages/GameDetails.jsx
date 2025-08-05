// src/pages/GameDetails.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/gameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        setGame(res.data);
      } catch (err) {
        console.error('Erreur récupération jeu :', err.message);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (!game) return <p>Chargement...</p>;

  console.log('Détails du jeu :', game);

  return (
    <div className="game-details-container">
      <h1>{game.name}</h1>
      <img src={game.background_image} alt={game.name} className="game-detail-image" />
      <p dangerouslySetInnerHTML={{ __html: game.description }}></p>

      <ul>
        <li>
          <strong>Genres :</strong> {game.genres.map(g => g.name).join(', ')}
        </li>
        <li>
          <strong>Plateformes :</strong> {game.platforms.map(p => p.platform.name).join(', ')}
        </li>
        <li>
          <strong>Développeurs :</strong>{' '}
          {game.developers?.map(d => d.name).join(', ') || 'Inconnu'}
        </li>
        <li>
          <strong>Note :</strong> {game.rating} / 5
        </li>
        <li>
          <strong>Date de sortie :</strong> {game.released}
        </li>
      </ul>
    </div>
  );
};

export default GameDetails;
