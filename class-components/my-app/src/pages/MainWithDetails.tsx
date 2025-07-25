import React from 'react';
import MainPage from './MainPage';
import PokemonDetail from '../components/PokemonDetail';
import { useSearchParams } from 'react-router-dom';

const MainWithDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const showDetails = searchParams.has('details');

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <MainPage />
      </div>
      {showDetails && (
        <aside style={{ width: '300px', borderLeft: '1px solid #ccc' }}>
          <PokemonDetail />
        </aside>
      )}
    </div>
  );
};

export default MainWithDetails;