import { createContext, useReducer } from 'react';
import { appReducer, defaultState } from '../reducer';
import { IContextValue } from './types';

export const AppContext = createContext<IContextValue>({
  state: defaultState,
  dispatch: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
