import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api/api';
import type { PokemonItem } from '../types';

export function usePokemonList(searchTerm: string, page: number) {
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const offset = (page - 1) * 10;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonList(searchTerm, 10, offset);
        setPokemons(data.results);
      } catch (err) {
        setError('Failed to fetch Pokemons');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [searchTerm, page]);

  return { pokemons, loading, error };
}
