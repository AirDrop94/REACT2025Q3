import React, { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  public render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <div className="app-container">
          <Header />
          <Main />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
