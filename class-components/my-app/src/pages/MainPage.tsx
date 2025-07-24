import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchPokemonList } from '../api/api';
import type { PokemonItem } from '../types';
import Search from '../components/Search';
import CardList from '../components/CardList';

const ITEMS_PER_PAGE = 20;

const MainPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const data = await fetchPokemonList('', ITEMS_PER_PAGE, offset);
        setPokemons(data.results);
        setError(null);
      } catch (e) {
        setError('Failed to load pokemons');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: nextPage.toString() });
  };

  return (
    <main>
      <Search />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <CardList pokemons={pokemons} />}
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button onClick={() => handlePageChange(page + 1)}>Next</button>
      </div>
    </main>
  );
};

export default MainPage;
