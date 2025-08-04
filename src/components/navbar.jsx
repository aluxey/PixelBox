import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/client" className="navbar-link navbar-brand">
          {' '}
          PixelBox{' '}
        </Link>
      </div>
      <div>
        <Link to="/items" className="navbar-link">
          Liste des jeux
        </Link>
        <Link to="/cart" className="navbar-link">
          Membres
        </Link>
        <Link to="/cart" className="navbar-link">
          Mon profil
        </Link>
        {/* <Link to="/login" className="btn-login">
          Login
        </Link>
        <Link to="/" className="btn-login">
          Sign up
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
