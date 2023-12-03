// import { setupListeners } from '@reduxjs/toolkit/query';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries, Country, ICountriesState } from './types';

const initialState: ICountriesState = {
  countries,
  currentCountry: countries[0],
};

export const countriesSlice = createSlice({
  name: 'countriesSlice',
  initialState,
  reducers: {
    setCurrentCountry: (state, action: PayloadAction<Country>) => {
      state.currentCountry = action.payload;
    },
  },
});

export const { setCurrentCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
