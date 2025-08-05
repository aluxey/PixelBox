import { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/userProfile.css';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [commentedGames, setCommentedGames] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchUserCommentsWithGameDetails = async () => {
      const q = query(collection(db, 'comments'), where('userId', '==', user.uid));
      const snap = await getDocs(q);
      const comments = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const enriched = await Promise.all(
        comments.map(async c => {
          try {
            const res = await axios.get(`https://api.rawg.io/api/games/${c.gameId}?key=${API_KEY}`);
            return {
              ...c,
              game: {
                name: res.data.name,
                image: res.data.background_image,
              },
            };
          } catch (err) {
            console.warn(`Erreur RAWG pour jeu ${c.gameId} :`, err.message);
            return {
              ...c,
              game: {
                name: 'Jeu introuvable',
                image: '',
              },
            };
          }
        })
      );

      setCommentedGames(enriched);
    };

    fetchUserCommentsWithGameDetails();
  }, [user]);

  if (!user) return <p>Tu dois être connecté pour voir ton profil.</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profil de {user.email}</h1>
      <h2>Mes commentaires :</h2>
      <div className="comment-list">
        {commentedGames.map(comment => (
          <div className="comment-card" key={comment.id}>
            <img src={comment.game.image} alt={comment.game.name} className="comment-thumbnail" />
            <div className="comment-details">
              <div className="comment-title">{comment.game.name}</div>
              <div className="comment-text">{comment.comment}</div>
              <div className="comment-rating">Note : {comment.rating} / 5</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
