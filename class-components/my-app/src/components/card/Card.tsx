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
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const isSelected = selectedItems.some((item) => item.name === pokemon.name);

  const { name, url } = pokemon;
  const idMatch = url.match(/\/pokemon\/(\d+)\//);
  const id = idMatch ? idMatch[1] : 'unknown';

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const handleClick = () => {
    if (onClick) {
      onClick(name);
    }
  };

  const handleCheckboxChange = () => {
    dispatch(toggleItem(pokemon));
  };

  return (
    <div className={`card ${isSelected ? 'card--selected' : ''}`} onClick={handleClick}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
        className="card__checkbox"
      />
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
