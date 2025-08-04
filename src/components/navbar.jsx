import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import logo from '../assets/pixelBoxLogo.png';
import '../styles/navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/" className="navbar-link navbar-brand">
          PixelBox
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/items" className="navbar-link">
          Liste des jeux
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="navbar-link">
              Mon profil
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Déconnexion
            </button>
            {user.photoURL ? (
              <img src={user.photoURL} alt="pfp" className="navbar-avatar" />
            ) : (
              <span className="navbar-user">{user.email}</span>
            )}
          </>
        ) : (
          <>
            <Link to="/auth" className="btn-login">
              Connexion / Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
