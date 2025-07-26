import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header__title">Pokemon Search</h1>
      <nav className="header__nav">
        <Link to="/" className="header__link">Home</Link>
        <span className="header__separator">|</span>
        <Link to="/about" className="header__link">About</Link>
      </nav>
    </header>
  );
};

export default Header;
