import React from 'react';
import type { PokemonItem } from '../types';
import Card from './Card';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  pokemons: PokemonItem[];
}

const CardList: React.FC<Props> = ({ pokemons }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCardClick = (id: string) => {
    searchParams.set('details', id);
    navigate(`/?${searchParams.toString()}`, { replace: false });
  };

  if (pokemons.length === 0) {
    return <p className="empty">Nothing was found</p>;
  }

  return (
    <div className="card-list">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} onClick={handleCardClick} />
      ))}
    </div>
  );
};

export default CardList;