import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1 className="header__title">Pokemon Search</h1>
      <nav className="header__nav">
        <Link to="/" className="header__link">Home</Link>
        <span className="header__separator">|</span>
        <Link to="/about" className="header__link">About</Link>
      </nav>
      <div className="header__theme-toggle">
        <label htmlFor="theme-toggle" className="header__theme-label">
        </label>
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="header__theme-button"
        >
          {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
};

export default Header;
