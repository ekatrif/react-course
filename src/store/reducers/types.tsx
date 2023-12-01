export interface IFormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: boolean;
  pictureBase64: string | null;
  country: string;
  formType: FormNames;
}

export type IState = IFormState[];

enum Country {
  UnitedStates = 'United States',
  Canada = 'Canada',
  UnitedKingdom = 'United Kingdom',
  Germany = 'Germany',
  France = 'France',
  Japan = 'Japan',
  Australia = 'Australia',
  Brazil = 'Brazil',
  India = 'India',
  China = 'China',
}

export enum FormNames {
  hookForm = 'hookForm',
  simpleForm = 'simpleForm',
}

export const countries: Country[] = [
  Country.UnitedStates,
  Country.Canada,
  Country.UnitedKingdom,
  Country.Germany,
  Country.France,
  Country.Japan,
  Country.Australia,
  Country.Brazil,
  Country.India,
  Country.China,
];
