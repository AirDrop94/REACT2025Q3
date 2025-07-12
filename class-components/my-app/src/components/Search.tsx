import React, { Component, ChangeEvent } from 'react';

interface Props {
  onSearch?: (searchTerm: string) => void;
}

interface State {
  inputValue: string;
}

const LS_KEY = 'pokemon_search_term';

class Search extends Component<Props, State> {
  state: State = {
    inputValue: '',
  };

  componentDidMount() {
    const savedTerm = localStorage.getItem(LS_KEY) || '';
    this.setState({ inputValue: savedTerm });
    if (savedTerm && this.props.onSearch) {
      this.props.onSearch(savedTerm);
    }
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.inputValue.trim();
    localStorage.setItem(LS_KEY, trimmed);
    if (this.props.onSearch) {
      this.props.onSearch(trimmed);
    }
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Enter Pokemon name"
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
