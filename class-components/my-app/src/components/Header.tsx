import React, { Component } from 'react';
import Search from './Search';

class Header extends Component {
  public render(): React.ReactNode {
    return (
      <header>
        <h1>Pokemon Search</h1>
        <Search />
      </header>
    );
  }
}

export default Header;
