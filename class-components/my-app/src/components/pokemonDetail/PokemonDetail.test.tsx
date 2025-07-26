import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokemonDetail from './PokemonDetail';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

global.fetch = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useSearchParams: jest.fn(),
  };
});

describe('PokemonDetail component', () => {
  const mockSetSearchParams = jest.fn();

  const setupWithId = (detailsId: string | null) => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(detailsId ? `details=${detailsId}` : ''),
      mockSetSearchParams,
    ]);

    render(
      <MemoryRouter>
        <PokemonDetail />
      </MemoryRouter>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render without "details" param', () => {
    setupWithId(null);
    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
  });

  it('renders loading state and then Pokemon details', async () => {
    const mockPokemon = {
      name: 'pikachu',
      sprites: { front_default: 'image-url' },
      height: 4,
      weight: 60,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockPokemon,
    });

    setupWithId('pikachu');

    expect(screen.getByText(/Loading details/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByAltText('pikachu')).toBeInTheDocument();
      expect(screen.getByText(/Height: 4/)).toBeInTheDocument();
      expect(screen.getByText(/Weight: 60/)).toBeInTheDocument();
    });
  });

  it('renders "Pokemon not found" if fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to load'));

    setupWithId('missingno');

    expect(screen.getByText(/Loading details/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Pokemon not found/i)).toBeInTheDocument();
    });
  });

  it('clicking "Close" removes details param', async () => {
    const mockPokemon = {
      name: 'bulbasaur',
      sprites: { front_default: 'image-url' },
      height: 7,
      weight: 69,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockPokemon,
    });

    setupWithId('bulbasaur');

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
