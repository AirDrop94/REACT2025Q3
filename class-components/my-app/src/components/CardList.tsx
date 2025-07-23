import React from 'react';
import type { PokemonItem } from '../types';
import Card from './Card';

interface Props {
  pokemons: PokemonItem[];
}

const CardList: React.FC<Props> = ({ pokemons }) => {
  if (pokemons.length === 0) {
    return <p className="empty">Nothing was found</p>;
  }

  return (
    <div className="card-list">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default CardList;
