import React from 'react';
import CardList from '../components/CardList';
import Search from '../components/Search';
import { useSearchParams } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemonList';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;

  const { pokemons, loading, error } = usePokemonList(searchTerm, page);

  const handleSearch = (term: string) => {
    setSearchParams({ q: term, page: '1' });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Search onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <CardList pokemons={pokemons} />}
    </div>
  );
};

export default MainPage;