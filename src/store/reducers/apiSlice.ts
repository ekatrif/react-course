import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Endpoints } from '../../api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${Endpoints.BASE_URL}`,
  }),
  endpoints: (builder) => ({
    getCards: builder.query({
      query: ({ searchText, page, cardsPerPage }) => ({
        url: `search?media_type=image&q=${searchText}&page=${page}&page_size=${cardsPerPage}`,
        method: 'Get',
      }),
    }),
  }),
});

export const { useGetCardsQuery } = api;
