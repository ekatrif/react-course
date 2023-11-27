import { test, expect, vi } from 'vitest';
import { fireEvent } from '@testing-library/react';
import DetailedBlock from '../components/DetailedBlock';
import { renderWithProviders } from '../test/test-utils';
import '@testing-library/jest-dom';
import { mockCards } from '../test/server/serverHandlers';

test('displays the detailed card data correctly', () => {
  vi.mock('react-router-dom', async () => {
    const mod = (await vi.importActual('react-router-dom')) as object;
    return {
      ...mod,
      useParams: () => ({
        id: 1,
      }),
    };
  });

  const { getByTestId } = renderWithProviders(
    <DetailedBlock cards={mockCards} id="1" />
  );

  setTimeout(() => {
    const detailedElement = getByTestId('detailed-title');
    expect(detailedElement).toBeInTheDocument();
    expect(detailedElement).toHaveTextContent('Expedition 28 Preflight');
  }, 500);
});

test('clicking the close button hides the component', () => {
  vi.mock('react-router-dom', async () => {
    const mod = (await vi.importActual('react-router-dom')) as object;
    return {
      ...mod,
      useParams: () => ({
        id: 1,
      }),
    };
  });
  const { queryByTestId } = renderWithProviders(
    <DetailedBlock cards={mockCards} id="1" />
  );

  const closeButton = queryByTestId('close-button') as Element;
  fireEvent.click(closeButton);

  setTimeout(() => {
    const detailedElement = queryByTestId('detailed');
    expect(detailedElement).not.toBeInTheDocument();
  }, 500);
});
