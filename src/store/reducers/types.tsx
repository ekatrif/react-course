import { ICard } from '../../components/Card';

export enum Actions {
  SET_SEARCH_TEXT,
  SET_PAGES,
  SET_CARDS_COUNT,
  SET_PAGE,
  SET_CARDS_PER_PAGE,
  SET_ISLOADING,
  SET_FETCH_SUCCESS,
  SET_FETCH_ERROR,
}

export interface IState {
  searchText: string;
  pages: number;
  cardsCount: number;
  page: number;
  cardsPerPage: number;
  isLoading: boolean;
  error: string;
}

export type PayloadText = string;
export type PayloadPages = number;
export type PayloadCardsCount = number;
export type PayloadPage = number;
export type PayloadCardsPerPage = number;
export type PayloadIsLoading = boolean;
export type PayloadFetchSuccess = {
  collection: {
    items: ICard[];
    metadata: {
      total_hits: number;
    };
  };
  isLoading: PayloadIsLoading;
  error: string;
};
export type PayloadFetchError = string;
