import { test, expect } from 'vitest';
import { getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from '../components/Cards';
import { renderWithProviders } from '../test/test-utils';
import { mockCards } from '../test/server/serverHandlers';

test('renders the specified number of cards', () => {
  const { getAllByTestId } = renderWithProviders(<Cards cards={mockCards} />);
  setTimeout(() => {
    const cardElements = getAllByTestId('card');
    expect(cardElements.length).toBe(mockCards.length);
  }, 100);
});

test('displays an appropriate message if no cards are present', () => {
  const { container } = renderWithProviders(<Cards cards={mockCards} />);
  setTimeout(() => {
    const messageElement = getByText(container, 'Nothing found.');
    expect(messageElement).toBeInTheDocument();
  }, 100);
});
