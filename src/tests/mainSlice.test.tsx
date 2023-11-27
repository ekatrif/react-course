import { it, expect } from 'vitest';
import mainReducer, {
  setSearchText,
  setPages,
  setCardsCount,
  setPage,
  setCardsPerPage,
} from '../store/reducers/mainSlice';
import { IState } from '../store/reducers/types';

const state = {
  searchText: 'example',
  cards: [],
  pages: 1,
  cardsCount: 0,
  page: 1,
  cardsPerPage: 5,
  isLoading: false,
  error: '',
};

it('should handle initial state', () => {
  const initialState: IState = state;
  const action = { type: 'unknown' };
  const expectedState = initialState;

  expect(mainReducer(initialState, action)).toEqual(expectedState);
});

it('should handle setSearchText', () => {
  const initialState: IState = { ...state, searchText: '' };
  const action = setSearchText('test');
  const expectedState: IState = { ...state, searchText: 'test' };

  expect(mainReducer(initialState, action)).toEqual(expectedState);
});

it('should handle setPages', () => {
  const initialState: IState = { ...state, pages: 0 };
  const action = setPages(5);
  const expectedState: IState = { ...state, pages: 5 };

  expect(mainReducer(initialState, action)).toEqual(expectedState);
});

it('should handle setCardsCount', () => {
  const initialState: IState = { ...state, cardsCount: 0 };
  const action = setCardsCount(10);
  const expectedState: IState = { ...state, cardsCount: 10 };

  expect(mainReducer(initialState, action)).toEqual(expectedState);
});

it('should handle setPage', () => {
  const initialState: IState = { ...state, page: 1 };
  const action = setPage(3);
  const expectedState: IState = { ...state, page: 3 };

  expect(mainReducer(initialState, action)).toEqual(expectedState);
});

it('should handle setCardsPerPage', () => {
  const initialState: IState = { ...state, cardsPerPage: 5 };
  const action = setCardsPerPage(15);
  const expectedState: IState = { ...state, cardsPerPage: 15 };

  expect(mainReducer(initialState, action)).toEqual(expectedState);
});
