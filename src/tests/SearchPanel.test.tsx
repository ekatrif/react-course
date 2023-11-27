import { fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import SearchPanel from '../components/SearchPanel';
import { renderWithProviders } from '../test/test-utils';

test('clicking Search button saves entered value to local storage', () => {
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
