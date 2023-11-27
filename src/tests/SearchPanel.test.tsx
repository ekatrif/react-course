import mockRouter from 'next-router-mock';
import { fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import SearchPanel from '../components/SearchPanel';
import { renderWithProviders } from '../test/test-utils';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

test('clicking Search button saves entered value to local storage', () => {
  mockRouter.push('/initial-path');

  const { getByTestId } = renderWithProviders(<SearchPanel />);

  const searchInput = getByTestId('search');
  fireEvent.change(searchInput, { target: { value: 'example' } });

  const submitButton = getByTestId('search-button');
  fireEvent.click(submitButton);

  expect(localStorage.getItem('searchText')).toBe('example');
});

test('component retrieves value from local storage upon mounting', () => {
  localStorage.setItem('searchText', 'example');

  const { getByTestId } = renderWithProviders(<SearchPanel />);

  const searchInput = getByTestId('search') as HTMLInputElement;

  setTimeout(() => {
    expect(searchInput.value).toBe('example');
  }, 500);
});
