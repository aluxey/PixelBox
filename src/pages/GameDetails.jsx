import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import axios from 'axios';
import '../styles/gameDetails.css';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const GameDetails = () => {
  const { id } = useParams();

  const [user] = useAuthState(auth);
  const [game, setGame] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);

  // 🟦 1. Charger les infos du jeu
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        setGame(res.data);
      } catch (err) {
        console.error('Erreur chargement jeu RAWG :', err.message);
      }
    };

    fetchGame();
  }, [id]);

  // 🟦 2. Charger les commentaires
  const fetchComments = async () => {
    try {
      const q = query(collection(db, 'comments'), where('gameId', '==', id));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => doc.data());
      setComments(data);
    } catch (err) {
      console.error('Erreur chargement commentaires :', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  // 🟦 3. Soumission commentaire
  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, 'comments'), {
        userId: user.uid,
        userEmail: user.email,
        userPhoto: user.photoURL || '',
        gameId: id,
        comment,
        rating: parseFloat(rating),
        createdAt: serverTimestamp(),
      });
      setComment('');
      setRating(0);
      fetchComments();
    } catch (err) {
      console.error('Erreur ajout commentaire :', err);
    }
  };

  // 🟦 4. Affichage
  return (
    <div className="game-details-page">
      {/* 🟩 Affichage du jeu */}
      {game ? (
        <div className="game-info">
          <h1>{game.name}</h1>
          <img src={game.background_image} alt={game.name} className="game-image" />
          <p dangerouslySetInnerHTML={{ __html: game.description }}></p>
        </div>
      ) : (
        <p>Chargement du jeu...</p>
      )}

      {/* 🟦 Section commentaire */}
      <div className="comment-section">
        <h2>Commentaires</h2>

        {user ? (
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              placeholder="Laisse ton avis"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            />
            <input
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={rating}
              onChange={e => setRating(e.target.value)}
              required
              placeholder="Note sur 5"
            />
            <button type="submit">Envoyer</button>
          </form>
        ) : (
          <p>Connecte-toi pour laisser un commentaire.</p>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p>Aucun commentaire pour ce jeu.</p>
          ) : (
            comments.map((c, idx) => (
              <div key={idx} className="comment-card">
                <div className="comment-header">
                  {c.userPhoto && <img src={c.userPhoto} alt="avatar" className="comment-avatar" />}
                  <strong>{c.userEmail}</strong>
                  <span>{c.rating} / 5</span>
                </div>
                <p>{c.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
