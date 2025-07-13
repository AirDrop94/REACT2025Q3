import React, { Component } from 'react';
import type { PokemonItem } from '../types';
import { fetchPokemonList } from '../api/api';
import Search from './Search';
import CardList from './CardList';

interface State {
  pokemons: PokemonItem[];
  loading: boolean;
  error: string | null;
}

class Main extends Component<Record<string, never>, State> {
  public state: State = {
    pokemons: [],
    loading: false,
    error: null,
  };

  public componentDidMount(): void {
    this.loadPokemons('');
  }

  private loadPokemons = async (searchTerm: string): Promise<void> => {
    try {
      this.setState({ loading: true, error: null });
      const data = await fetchPokemonList(searchTerm, 20, 0);
      this.setState({ pokemons: data.results });
    } catch (error) {
      console.warn('Fetch error:', error);
      this.setState({ error: 'Can`t load data' });
    } finally {
      this.setState({ loading: false });
    }
  };

  private handleSearch = (searchTerm: string): void => {
    this.loadPokemons(searchTerm);
  };

  private throwError = (): void => {
    throw new Error('Test error');
  };

  public render(): React.ReactNode {
    const { pokemons, loading, error } = this.state;

    return (
      <main className="main">
        <Search onSearch={this.handleSearch} />
        <button className="error-button" onClick={this.throwError}>
          Break the app
        </button>

        {loading && <p className="loading">Loading...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && <CardList pokemons={pokemons} />}
      </main>
    );
  }
}

export default Main;
