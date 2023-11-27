import mockRouter from 'next-router-mock';
import { test, expect, vi } from 'vitest';
import MainPage from '../components/MainPage';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../test/test-utils';
import { mockData } from '../test/server/serverHandlers';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

test('renders the mainBlock element', () => {
  mockRouter.push('/initial-path');
  const { getByTestId } = renderWithProviders(<MainPage data={mockData} />);

  const mainBlockElement = getByTestId('main-block');
  expect(mainBlockElement).toBeInTheDocument();
});

test('renders the search element', () => {
  mockRouter.push('/initial-path');
  const { getByTestId } = renderWithProviders(<MainPage data={mockData} />);

  const searchElement = getByTestId('search');
  expect(searchElement).toBeInTheDocument();
});
