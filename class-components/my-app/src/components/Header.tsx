import React, { Component } from 'react';
import Search from './Search';

class Header extends Component {
  render() {
    return (
      <header>
        <h1 style={{ textAlign: 'center', margin: '1rem 0' }}>
          Pokemon Search
        </h1>
        <Search />
      </header>
    );
  }
}

export default Header;
