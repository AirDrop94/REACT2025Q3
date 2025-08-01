import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';

jest.mock('../../components/search/Search', () => {
  const MockSearch = () => <div data-testid="mock-search">Search</div>;
  MockSearch.displayName = 'MockSearch';
  return MockSearch;
});

jest.mock('../../components/cardList/CardList', () => {
  const MockCardList = () => <div data-testid="mock-cardlist">CardList</div>;
  MockCardList.displayName = 'MockCardList';
  return MockCardList;
});

jest.mock('../../components/pagination/Pagination', () => {
  const MockPagination = () => <div data-testid="mock-pagination">Pagination</div>;
  MockPagination.displayName = 'MockPagination';
  return MockPagination;
});

jest.mock('../../hooks/usePokemonList', () => ({
  usePokemonList: jest.fn(),
}));

import { usePokemonList } from '../../hooks/usePokemonList';

describe('MainPage', () => {
  it('renders loading state', () => {
    (usePokemonList as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: true,
      error: '',
    });

    render(<MainPage />, { wrapper: MemoryRouter });
    expect(screen.getByTestId('mock-search')).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error state', () => {
    (usePokemonList as jest.Mock).mockReturnValue({
      pokemons: [],
      loading: false,
      error: 'Failed to fetch data',
    });

    render(<MainPage />, { wrapper: MemoryRouter });
    expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
  });

  it('renders data state with CardList and Pagination', () => {
    (usePokemonList as jest.Mock).mockReturnValue({
      pokemons: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
      loading: false,
      error: '',
    });

    render(<MainPage />, { wrapper: MemoryRouter });
    expect(screen.getByTestId('mock-cardlist')).toBeInTheDocument();
    expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
  });
});
