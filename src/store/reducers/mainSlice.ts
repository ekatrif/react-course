// import { setupListeners } from '@reduxjs/toolkit/query';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  IState,
  PayloadText,
  PayloadCards,
  PayloadPages,
  PayloadCardsCount,
  PayloadPage,
  PayloadCardsPerPage,
  PayloadIsLoading,
  PayloadFetchSuccess,
  PayloadFetchError,
} from './types';
import { CARDS_PER_PAGE } from '../../settings';

let initialSearchText = '';

if (typeof window !== 'undefined') {
  initialSearchText = localStorage.getItem('searchText') || '';
}

export const initialState: IState = {
  searchText: initialSearchText,
  cards: [],
  pages: 1,
  cardsCount: 0,
  page: 1,
  cardsPerPage: CARDS_PER_PAGE[0],
  isLoading: false,
  error: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<PayloadText>) {
      state.searchText = action.payload;
    },
    setCards(state, action: PayloadAction<PayloadCards>) {
      state.cards = action.payload;
    },
    setPages(state, action: PayloadAction<PayloadPages>) {
      state.pages = action.payload;
    },
    setCardsCount(state, action: PayloadAction<PayloadCardsCount>) {
      state.cardsCount = action.payload;
    },
    setPage(state, action: PayloadAction<PayloadPage>) {
      state.page = action.payload;
    },
    setCardsPerPage(state, action: PayloadAction<PayloadCardsPerPage>) {
      state.cardsPerPage = action.payload;
    },
    setIsLoading(state, action: PayloadAction<PayloadIsLoading>) {
      state.isLoading = action.payload;
    },
    setFetchSuccess(state, action: PayloadAction<PayloadFetchSuccess>) {
      const { items, metadata } = action.payload.collection;
      state.isLoading = false;
      state.cards = items;
      state.cardsCount = +metadata.total_hits;
      state.error = '';
    },
    setFetchError(state, action: PayloadAction<PayloadFetchError>) {
      state.isLoading = false;
      state.cards = [];
      state.cardsCount = 0;
      state.error = action.payload;
    },
  },
});

export const {
  setSearchText,
  setCards,
  setPages,
  setCardsCount,
  setPage,
  setCardsPerPage,
  setIsLoading,
  setFetchSuccess,
  setFetchError,
} = mainSlice.actions;

export default mainSlice.reducer;
