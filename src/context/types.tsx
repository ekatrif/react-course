import { Dispatch, ReducerAction } from 'react';
import { IState } from '../reducer/types';
import { appReducer } from '../reducer';

export interface SearchContextValue {
  state: IState;
  dispatch: Dispatch<ReducerAction<typeof appReducer>>;
}
