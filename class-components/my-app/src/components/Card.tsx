import React, { Component } from 'react';
import type { PokemonItem } from '../types';
import type { JSX } from 'react/jsx-runtime';

interface Props {
  pokemon: PokemonItem;
}

class Card extends Component<Props> {
  public render(): JSX.Element {
    const { name, url } = this.props.pokemon;
    const idMatch = url.match(/\/pokemon\/(\d+)\//);
    const id = idMatch ? idMatch[1] : 'unknown';
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <div className="card">
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
      </div>
    );
  }
}

export default Card;