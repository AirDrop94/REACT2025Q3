import React, { Component } from 'react';
import { fetchPokemonList } from '../api/api';
import { PokemonItem } from '../types';
import Search from './Search';
import CardList from './CardList';

interface State {
  pokemons: PokemonItem[];
  loading: boolean;
  error: string | null;
}

class Main extends Component<{}, State> {
  state: State = {
    pokemons: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.loadPokemons('');
  }

  loadPokemons = async (searchTerm: string) => {
    try {
      this.setState({ loading: true, error: null });
      const data = await fetchPokemonList(searchTerm, 20, 0);
      this.setState({ pokemons: data.results });
    } catch (error) {
      console.error('Fetch error:', error);
      this.setState({ error: 'Failed to load data' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (searchTerm: string) => {
    this.loadPokemons(searchTerm);
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    const { pokemons, loading, error } = this.state;

    return (
      <main style={{ padding: '1rem' }}>
        <Search onSearch={this.handleSearch} />
        <button onClick={this.throwError} style={{ marginBottom: '1rem' }}>
          Break the application
        </button>

        {loading && <p>Loading...</p>}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && <CardList pokemons={pokemons} />}
      </main>
    );
  }
}

export default Main;
