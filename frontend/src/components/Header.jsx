import { FaCar, FaMoon, FaSun, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './Header.css';

export default function Header({ theme, onThemeToggle, onUserIconClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on window resize (if going to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <header className="header-root">
      <div className="header-logo" tabIndex={0}>
        <FaCar size={32} />
        <span className="header-title">Carzz</span>
      </div>
      {/* Desktop actions */}
      <div className="header-actions">
        <button
          aria-label="Toggle theme"
          onClick={onThemeToggle}
          className="header-theme-btn"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
        <button
          className="header-user-icon"
          aria-label="User menu"
          onClick={onUserIconClick}
        >
          <FaUserCircle size={28} />
        </button>
      </div>
      {/* Hamburger for mobile */}
      <button
        className="header-hamburger"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="header-mobile-menu"
        onClick={() => setMenuOpen((v) => !v)}
      >
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </button>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="header-mobile-menu" id="header-mobile-menu" role="menu">
          <button
            aria-label="Toggle theme"
            onClick={() => { setMenuOpen(false); onThemeToggle(); }}
            className="header-theme-btn"
            role="menuitem"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
            <span style={{ marginLeft: 10 }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            className="header-user-icon"
            aria-label="User menu"
            onClick={() => { setMenuOpen(false); onUserIconClick(); }}
            role="menuitem"
          >
            <FaUserCircle size={24} style={{ marginRight: 10 }} />Account
          </button>
        </div>
      )}
    </header>
  );
} 