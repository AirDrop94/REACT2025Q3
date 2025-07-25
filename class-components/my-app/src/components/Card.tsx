import React from 'react';
import type { PokemonItem } from '../types';

interface Props {
  pokemon: PokemonItem;
  onClick?: (name: string) => void;
}

const Card: React.FC<Props> = ({ pokemon, onClick }) => {
  const { name, url } = pokemon;

  const idMatch = url.match(/\/pokemon\/(\d+)\//);
  const id = idMatch ? idMatch[1] : 'unknown';

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const handleClick = () => {
    if (onClick) {
      console.log('Clicked on:', id);
      onClick(name);
    }
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
