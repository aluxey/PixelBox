import { useState } from 'react';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import '../styles/auth.css';

const SignInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Connecté :', result.user);
      navigate('/');
    } catch (err) {
      console.error('Erreur Google Sign-In', err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignUp ? 'Créer un compte' : 'Se connecter'}</h2>
        <button onClick={handleGoogleLogin} className="btn-login-google">
          Connexion avec Google
        </button>
        <div className="switch-auth-mode">
          {isSignUp ? 'Déjà inscrit ?' : 'Pas encore de compte ?'}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Connexion' : 'Créer un compte'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
