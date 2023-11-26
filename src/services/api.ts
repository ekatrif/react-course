import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Endpoints } from '../settings';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: Endpoints.BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return null;
  },
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ searchText, page, cardsPerPage }) =>
        `search?media_type=image&q=${searchText}&page=${page}&page_size=${cardsPerPage}`,
    }),
  }),
});

// To use in functional components
export const {
  useGetDataQuery,
  util: { getRunningQueriesThunk },
} = api;

// To use in SSR
export const { getData } = api.endpoints;
