// import { setupListeners } from '@reduxjs/toolkit/query';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState, IFormState } from './types';

export const reactHookForm = createSlice({
  name: 'reactHookForm',
  initialState: [] as IState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<{ data: IFormState; pictureBase64: string }>
    ) => {
      state.push({
        name: action.payload.data.name,
        age: action.payload.data.age,
        email: action.payload.data.email,
        password: action.payload.data.password,
        confirmPassword: action.payload.data.confirmPassword,
        gender: action.payload.data.gender,
        acceptTC: action.payload.data.acceptTC,
        pictureBase64: action.payload.pictureBase64,
        country: action.payload.data.country,
      });
    },
  },
});

export const { setFormData } = reactHookForm.actions;

export default reactHookForm.reducer;
