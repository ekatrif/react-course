import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { api } from '../services/api';
import mainReducer from './reducers/mainSlice';

const rootReducer = combineReducers({
  mainReducer,
  [api.reducerPath]: api.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
    preloadedState,
  });
};

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(() => setupStore());
