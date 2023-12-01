// import { setupListeners } from '@reduxjs/toolkit/query';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState, IFormState, FormNames } from './types';

export const formSlice = createSlice({
  name: 'formSlice',
  initialState: [] as IState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<{
        data: IFormState;
        pictureBase64: string;
        formType: FormNames;
      }>
    ) => {
      state.push({
        formType: action.payload.formType,
        name: action.payload.data.name,
        age: action.payload.data.age,
        email: action.payload.data.email,
        password: action.payload.data.password,
        confirmPassword: action.payload.data.confirmPassword,
        gender: action.payload.data.gender,
        acceptTC: action.payload.data.acceptTC,
        country: action.payload.data.country,
        pictureBase64: action.payload.pictureBase64,
      });
    },
  },
});

export const { setFormData } = formSlice.actions;

export default formSlice.reducer;
