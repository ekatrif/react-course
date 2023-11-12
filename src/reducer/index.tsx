import { CARDS_PER_PAGE } from '../settings';
import { IState, Action, Actions } from './types';

export const defaultState: IState = {
  searchText: localStorage.getItem('searchText') || '',
  cards: [],
  pages: 1,
  cardsCount: 0,
  page: 1,
  cardsPerPage: CARDS_PER_PAGE[0],
  isLoading: false,
};

export const appReducer = (state: IState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.SET_SEARCH_TEXT:
      return { ...state, searchText: payload };
    case Actions.SET_CARDS:
      return { ...state, cards: { payload, ...state.cards } };
    case Actions.SET_PAGES:
      return { ...state, pages: payload };
    case Actions.SET_CARDS_COUNT:
      return { ...state, pages: payload };
    case Actions.SET_PAGE:
      return { ...state, page: payload };
    case Actions.SET_CARDS_PER_PAGE:
      return { ...state, cardsPerPage: payload };
    case Actions.SET_ISLOADING:
      return { ...state, isLoading: payload };
    case Actions.SET_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cards: payload.collection.items,
        cardsCount: +payload.collection.metadata.total_hits,
        error: '',
      };
    case Actions.SET_FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        cards: [],
        cardsCount: 0,
        error: 'Error while fetching',
      };

    default:
      return state;
  }
};
