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

describe('CardList component', () => {
  const mockPokemons: PokemonItem[] = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
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
