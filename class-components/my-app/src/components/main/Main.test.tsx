import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Main from './Main';
import * as api from '../../api/api';
import type { PokemonItem } from '../../types';

jest.mock('../api/api');

jest.mock('./Search', () => ({
  __esModule: true,
  default: ({ onSearch }: { onSearch: (term: string) => void }) => (
    <div>
      <input
        data-testid="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  ),
}));

jest.mock('./CardList', () => ({
  __esModule: true,
  default: ({ pokemons }: { pokemons: PokemonItem[] }) => (
    <div data-testid="card-list">
      {pokemons.map((p) => (
        <div key={p.name}>{p.name}</div>
      ))}
    </div>
  ),
}));

describe('Main component', () => {
  const mockPokemons = {
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Search and Break button', () => {
    render(<Main />);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /break the application/i })
    ).toBeInTheDocument();
  });

  it('loads pokemons on mount (success)', async () => {
    (api.fetchPokemonList as jest.Mock).mockResolvedValueOnce(mockPokemons);
    render(<Main />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId('card-list')).toBeInTheDocument()
    );
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('shows error message on API failure', async () => {
    (api.fetchPokemonList as jest.Mock).mockRejectedValueOnce(
      new Error('API Error')
    );
    render(<Main />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument()
    );
  });

  it('calls handleSearch when input changes', async () => {
    (api.fetchPokemonList as jest.Mock).mockResolvedValueOnce(mockPokemons);
    render(<Main />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'charizard' } });

    await waitFor(() => {
      expect(api.fetchPokemonList).toHaveBeenCalledWith('charizard', 20, 0);
    });
  });

  it('throws error when Break button clicked', () => {
    render(<Main />);
    const breakButton = screen.getByRole('button', {
      name: /break the application/i,
    });
    expect(() => fireEvent.click(breakButton)).toThrow('Test error');
  });
});
