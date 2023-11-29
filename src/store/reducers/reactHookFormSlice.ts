// import { setupListeners } from '@reduxjs/toolkit/query';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormState } from './types';

export const initialState: IFormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTC: false,
  picture: null,
  country: '',
};

export const reactHookForm = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<IFormState>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.gender = action.payload.gender;
      state.acceptTC = action.payload.acceptTC;
      state.picture = action.payload.picture;
      state.country = action.payload.country;
    },
  },
});

export const { setFormData } = reactHookForm.actions;

export default reactHookForm.reducer;
