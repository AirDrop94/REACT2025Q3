import React, { Component } from 'react';
import type { PokemonItem } from '../types';
import Card from './Card';
import type { JSX } from 'react/jsx-runtime';

interface Props {
  pokemons: PokemonItem[];
}

class CardList extends Component<Props> {
  public render(): JSX.Element {
    const { pokemons } = this.props;

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
  }
}

export default CardList;
