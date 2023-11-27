import { test, expect } from 'vitest';
import MainPage from '../components/MainPage';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../test/test-utils';

test('renders the mainBlock element', () => {
  const { getByTestId } = renderWithProviders(<MainPage />);

  const mainBlockElement = getByTestId('main-block');
  expect(mainBlockElement).toBeInTheDocument();
});

test('renders the search element', () => {
  const { getByTestId } = renderWithProviders(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  const searchElement = getByTestId('search');
  expect(searchElement).toBeInTheDocument();
});
