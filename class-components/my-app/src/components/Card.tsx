import React, { Component } from 'react';
import { PokemonItem } from '../types';

interface Props {
  pokemon: PokemonItem;
}

class Card extends Component<Props> {
  render() {
    const { name, url } = this.props.pokemon;
    const idMatch = url.match(/\/pokemon\/(\d+)\//);
    const id = idMatch ? idMatch[1] : 'unknown';
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem', textAlign: 'center' }}>
        <img src={imageUrl} alt={name} style={{ width: '100px', height: '100px' }} />
        <h3 style={{ textTransform: 'capitalize' }}>{name}</h3>
      </div>
    );
  }
}

export default Card;
