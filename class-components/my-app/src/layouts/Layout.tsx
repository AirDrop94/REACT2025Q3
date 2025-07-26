import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from '../components/header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <nav style={{ padding: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <div style={{ display: 'flex' }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
