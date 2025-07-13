import React, { Component, type ChangeEvent } from 'react';
import type { JSX } from 'react/jsx-runtime';

interface Props {
  onSearch?: (searchTerm: string) => void;
}

interface State {
  inputValue: string;
}

const LS_KEY = 'pokemon_search_term';

class Search extends Component<Props, State> {
  public state: State = {
    inputValue: '',
  };

  public componentDidMount(): void {
    const savedTerm = localStorage.getItem(LS_KEY) || '';
    this.setState({ inputValue: savedTerm });
    if (savedTerm && this.props.onSearch) {
      this.props.onSearch(savedTerm);
    }
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  private handleSearch = (): void => {
    const trimmed = this.state.inputValue.trim();
    localStorage.setItem(LS_KEY, trimmed);
    if (this.props.onSearch) {
      this.props.onSearch(trimmed);
    }
  };

  public render(): JSX.Element {
    return (
      <div className="search-container">
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
