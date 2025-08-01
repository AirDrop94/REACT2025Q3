import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

jest.mock('../components/header/Header', () => {
  const MockHeader = () => <header data-testid="mock-header">Mock Header</header>;
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Mock Outlet Content</div>,
  };
});

describe('Layout', () => {
  it('renders Header, navigation links, and Outlet content', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();

    expect(screen.getByTestId('mock-outlet')).toBeInTheDocument();
  });
});
