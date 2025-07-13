import React, { Component } from 'react';
import { PokemonItem } from '../types';
import Card from './Card';

interface Props {
  pokemons: PokemonItem[];
}

class CardList extends Component<Props> {
  render() {
    const { pokemons } = this.props;

    if (pokemons.length === 0) {
      return <p>Nothing found.</p>;
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default CardList;
