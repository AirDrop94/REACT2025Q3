import React from 'react';
import PokemonDetail from '../components/PokemonDetail';
import CardList from '../components/CardList';
import Search from '../components/Search';
import { useSearchParams } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemonList';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;
  const offset = (page - 1) * 20;

  const { pokemons, loading, error } = usePokemonList(searchTerm, offset);

  const handleSearch = (term: string) => {
    setSearchParams({ q: term, page: '1' });
  };

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <main style={{ flex: 1, padding: '1rem' }}>
        <Search onSearch={handleSearch} />

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && <CardList pokemons={pokemons} />}
      </main>

      <aside style={{ width: '300px', borderLeft: '1px solid #ccc' }}>
        <PokemonDetail />
      </aside>
    </div>
  );
};

export default MainPage;
