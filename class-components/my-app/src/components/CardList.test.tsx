import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import type { PokemonItem } from '../types';

jest.mock('./Card', () => ({
  __esModule: true,
  default: ({ pokemon }: { pokemon: PokemonItem }) => (
    <div data-testid="mock-card">{pokemon.name}</div>
  ),
}));

const SPRITE_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

describe('CardList component', () => {
  const mockPokemons: PokemonItem[] = [
    { name: 'bulbasaur', url: `${SPRITE_BASE_URL}1/` },
    { name: 'ivysaur', url: `${SPRITE_BASE_URL}2/` },
    { name: 'venusaur', url: `${SPRITE_BASE_URL}3/` },
  ];

  it('renders message when no pokemons are provided', () => {
    render(<CardList pokemons={[]} />);
    expect(screen.getByText(/nothing was found/i)).toBeInTheDocument();
  });

  it('renders correct number of Card components', () => {
    render(<CardList pokemons={mockPokemons} />);
    const cards = screen.getAllByTestId('mock-card');
    expect(cards).toHaveLength(mockPokemons.length);
  });

  it('renders container with class "card-list"', () => {
    render(<CardList pokemons={mockPokemons} />);
    const container = screen.getByRole('region', { name: /card-list/i });
    expect(container).toBeInTheDocument();
  });
});
