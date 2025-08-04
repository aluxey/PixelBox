// src/pages/GameList.jsx
import React, { useEffect, useState } from 'react';
import { fetchGames } from '../api/rawg';
import '../styles/gameList.css';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchGames(page).then(data => setGames(data.results));
  }, [page]);

  return (
    <div className="game-list-container">
      <h1>🎮 Liste de jeux video</h1>

      <div className="game-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.background_image} alt={game.name} className="game-image" />
            <h3>{game.name}</h3>
            <p>Note : {game.rating}</p>
            <p>Sorti le : {game.released}</p>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>⬅️ Page précédente</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>➡️ Page suivante</button>
      </div>
    </div>
  );
};

export default GameList;
