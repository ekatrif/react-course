import { ICard } from '../components/Card/Card';

export enum Actions {
  SET_SEARCH_TEXT,
  SET_CARDS,
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
  cards: ICard[];
  pages: number;
  cardsCount: number;
  page: number;
  cardsPerPage: number;
  isLoading: boolean;
}

type PayloadText = string;
type PayloadCards = ICard[];
type PayloadPages = number;
type PayloadCardsCount = number;
type PayloadPage = number;
type PayloadCardsPerPage = number;
type PayloadIsLoading = boolean;
type PayloadFetchSuccess = {
  collection: {
    items: ICard[];
    metadata: {
      total_hits: number;
    };
  };
  isLoading: PayloadIsLoading;
  error: string;
};
type PayloadFetchError = object;

export type Action =
  | { type: Actions.SET_SEARCH_TEXT; payload: PayloadText }
  | { type: Actions.SET_CARDS; payload: PayloadCards }
  | { type: Actions.SET_PAGES; payload: PayloadPages }
  | { type: Actions.SET_CARDS_COUNT; payload: PayloadCardsCount }
  | { type: Actions.SET_PAGE; payload: PayloadPage }
  | { type: Actions.SET_CARDS_PER_PAGE; payload: PayloadCardsPerPage }
  | { type: Actions.SET_ISLOADING; payload: PayloadIsLoading }
  | { type: Actions.SET_FETCH_SUCCESS; payload: PayloadFetchSuccess }
  | { type: Actions.SET_FETCH_ERROR; payload: PayloadFetchError };
