import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  IState,
  PayloadText,
  PayloadPages,
  PayloadCardsCount,
  PayloadPage,
  PayloadCardsPerPage,
} from './types';
import { CARDS_PER_PAGE } from '../../settings';

let initialSearchText = '';

if (typeof window !== 'undefined') {
  initialSearchText = localStorage.getItem('searchText') || '';
}

export const initialState: IState = {
  searchText: initialSearchText,
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
  },
});

export const {
  setSearchText,
  setPages,
  setCardsCount,
  setPage,
  setCardsPerPage,
} = mainSlice.actions;

export default mainSlice.reducer;
