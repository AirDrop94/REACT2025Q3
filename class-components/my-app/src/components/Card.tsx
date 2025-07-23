import React from 'react';
import type { PokemonItem } from '../types';

interface Props {
  pokemon: PokemonItem;
}

const Card: React.FC<Props> = ({ pokemon }) => {
  const { name, url } = pokemon;

  const idMatch = url.match(/\/pokemon\/(\d+)\//);
  const id = idMatch ? idMatch[1] : 'unknown';

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
