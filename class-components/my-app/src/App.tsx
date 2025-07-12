import React, { Component } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
//import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          {/* <Main /> */}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
