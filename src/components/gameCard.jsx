const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.background_image || ''} alt={game.name} className="game-image" />
      <h3>{game.name}</h3>
      <p>Note : {game.rating}</p>
      <p>Sorti le : {game.released}</p>
    </div>
  );
};

export default GameCard;
