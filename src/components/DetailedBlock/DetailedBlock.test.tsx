import { test, expect, vi } from 'vitest';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DetailedBlock from './DetailedBlock';
import { renderWithProviders } from '../../test/test-utils';
import '@testing-library/jest-dom';

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
    <BrowserRouter>
      <DetailedBlock />
    </BrowserRouter>
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
    <BrowserRouter>
      <DetailedBlock />
    </BrowserRouter>
  );

  const closeButton = queryByTestId('close-button') as Element;
  fireEvent.click(closeButton);

  setTimeout(() => {
    const detailedElement = queryByTestId('detailed');
    expect(detailedElement).not.toBeInTheDocument();
  }, 500);
});
