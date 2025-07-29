import React from 'react';
import type { PokemonItem } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleItem } from '../../store/selectedItemsSlice';
import './Card.css';

interface Props {
  pokemon: PokemonItem;
  onClick?: (name: string) => void;
}

const Card: React.FC<Props> = ({ pokemon, onClick }) => {
  const { name, url } = pokemon;
  const idMatch = url.match(/\/pokemon\/(\d+)\//);
  const id = idMatch ? idMatch[1] : 'unknown';

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) => state.selectedItems.items.some((item) => item.name === name));

  const handleCheckboxChange = () => {
    dispatch(toggleItem({ ...pokemon, id }));
  };

  const handleCardClick = () => {
    if (onClick && id !== 'unknown') {
      onClick(name);
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
