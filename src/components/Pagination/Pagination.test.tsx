import { render, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../../context';
import Pagination from './Pagination';

const mockedUsedNavigate = vi.fn();

test('component updates URL query parameter when page changes', () => {
  vi.mock('react-router-dom', async () => ({
    ...((await vi.importActual('react-router-dom')) as object),
    useNavigate: () => mockedUsedNavigate(),
  }));

  const mockContext = {
    state: {
      cards: [],
      searchText: '',
      pages: 1,
      cardsCount: 0,
      page: 1,
      cardsPerPage: 1,
      isLoading: true,
    },
    dispatch: () => {},
  };

  const { getByTestId } = render(
    <BrowserRouter>
      <AppContext.Provider value={mockContext}>
        <Pagination />
      </AppContext.Provider>
    </BrowserRouter>
  );

  // Change the page value
  const nextPageButton = getByTestId('next');
  fireEvent.click(nextPageButton);

  setTimeout(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith(
      `?page=${mockContext.state.page + 1}`
    );
  }, 500);
});
