import { fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchPanel from './SearchPanel';
import { renderWithProviders } from '../../test/test-utils';

test('clicking Search button saves entered value to local storage', () => {
  const { getByTestId } = renderWithProviders(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );

  const searchInput = getByTestId('search');
  fireEvent.change(searchInput, { target: { value: 'example' } });

  const submitButton = getByTestId('search-button');
  fireEvent.click(submitButton);

  expect(localStorage.getItem('searchText')).toBe('example');
});

test('component retrieves value from local storage upon mounting', () => {
  localStorage.setItem('searchText', 'example');

  const { getByTestId } = renderWithProviders(
    <BrowserRouter>
      <SearchPanel />
    </BrowserRouter>
  );

  const searchInput = getByTestId('search') as HTMLInputElement;

  setTimeout(() => {
    expect(searchInput.value).toBe('example');
  }, 500);
});
