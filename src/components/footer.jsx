import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>PixelBox</h4>
          <ul>
            <li>
              <a href="/">Jeux</a>
            </li>
            <li>
              <a href="/">Nouvelles sorties</a>
            </li>
            <li>
              <a href="/">Best Sellers</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>À propos</h4>
          <ul>
            <li>
              <a href="/">Qui sommes-nous ?</a>
            </li>
            <li>
              <a href="/">Notre histoire</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="/">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:contact@site-site.com">contact@site.com</a>
            </li>
            <li>
              <a href="tel:+33123456789">+33 1 23 45 67 89</a>
            </li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Newsletter</h4>
          <form onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Votre e-mail" required />
            <button type="submit">OK</button>
          </form>
        </div>
      </div>

      <div className="footer-social">
        <a href="#" aria-label="Facebook" className="social-icon">
          {/* Remplace par tes SVG ou icônes */}
          <svg width="24" height="24">
            {/* … */}
          </svg>
        </a>
        <a href="#" aria-label="Instagram" className="social-icon">
          <svg width="24" height="24">
            {/* … */}
          </svg>
        </a>
        <a href="#" aria-label="Pinterest" className="social-icon">
          <svg width="24" height="24">
            {/* … */}
          </svg>
        </a>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PixelBox. Tous droits réservés.</p>
        <p>
          <a href="/cgv">CGV</a> • <a href="/politique-confidentialite">Privacy</a> •{' '}
          <a href="/mentions-legales">Mentions légales</a>
        </p>
      </div>
    </footer>
  );
}
