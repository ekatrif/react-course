// export type Base64<ImageType extends string> =
//   `data:image/${ImageType};base64${string}`;

export interface IFormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: boolean;
  picture: File | null;
  country: string;
}

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
