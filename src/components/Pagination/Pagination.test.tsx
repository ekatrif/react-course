import { fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../test/test-utils';
import Pagination from './Pagination';

const mockedUsedNavigate = vi.fn();

test('component updates URL query parameter when page changes', () => {
  vi.mock('react-router-dom', async () => ({
    ...((await vi.importActual('react-router-dom')) as object),
    useNavigate: () => mockedUsedNavigate(),
  }));

  const { getByTestId } = renderWithProviders(
    <BrowserRouter>
      <Pagination />
    </BrowserRouter>
  );

  // Change the page value
  const nextPageButton = getByTestId('next');
  fireEvent.click(nextPageButton);

  setTimeout(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith(`?page=2`);
  }, 500);
});
