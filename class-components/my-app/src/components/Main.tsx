import React, { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api/api';
import type { PokemonItem } from '../types';
import Search from './Search';
import CardList from './CardList';

const Main: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPokemons('');
  }, []);

  const loadPokemons = async (searchTerm: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList(searchTerm, 20, 0);
      setPokemons(data.results);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string): void => {
    loadPokemons(searchTerm);
  };

  const throwError = (): void => {
    throw new Error('Test error');
  };

  return (
    <main style={{ padding: '1rem' }}>
      <Search onSearch={handleSearch} />
      <button onClick={throwError} style={{ marginBottom: '1rem' }}>
        Break the application
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <CardList pokemons={pokemons} />}
    </main>
  );
};

export default Main;

