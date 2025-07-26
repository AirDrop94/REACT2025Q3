import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';

const WrapperWithSearchParams: React.FC<{ initialPage?: string }> = ({ initialPage = '1' }) => {
  const [, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    setSearchParams({ page: initialPage });
  }, [initialPage, setSearchParams]);

  return <Pagination />;
};

describe('Pagination component', () => {
  it('should display current page', () => {
    render(
      <MemoryRouter initialEntries={['/?page=3']}>
        <Pagination />
      </MemoryRouter>
    );

    expect(screen.getByText(/Page 3/i)).toBeInTheDocument();
  });

  it('disables "Previous" button on page 1', () => {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Pagination />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('clicking "Next" updates the page', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <WrapperWithSearchParams initialPage="2" />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(screen.getByText(/Page 3/i)).toBeInTheDocument();
  });

  it('clicking "Previous" works when page > 1', () => {
    render(
      <MemoryRouter initialEntries={['/?page=5']}>
        <WrapperWithSearchParams initialPage="5" />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    expect(screen.getByText(/Page 4/i)).toBeInTheDocument();
  });
});
