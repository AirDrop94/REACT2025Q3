import React from 'react';
import MainPage from './MainPage';
import PokemonDetail from '../components/pokemonDetail/PokemonDetail';
import { useSearchParams } from 'react-router-dom';
import './MainWithDetails.css';

const MainWithDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const showDetails = searchParams.has('details');

  return (
    <div className="main-with-details">
      <div className="main-section">
        <MainPage />
      </div>
      {showDetails && (
        <aside className="details-section">
          <PokemonDetail />
        </aside>
      )}
    </div>
  );
};

export default MainWithDetails;