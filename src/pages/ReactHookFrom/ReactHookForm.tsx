import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import YupPassword from 'yup-password';
import { setFormData } from '../../store/reducers/formSlice';
import {
  IFormState,
  FormNames,
  ICountriesState,
  Country,
} from '../../store/reducers/types';
import CustomSelect from '../../components/CustomSelect/CustomSelect';

type LastFormType = {
  state: {
    formType: FormNames;
  };
};

YupPassword(yup);

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[A-Z][a-zA-Z\\s]*$/,
      'Name should start with an uppercase letter'
    ),
  age: yup
    .number()
    .positive('Age should be a positive number')
    .required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minNumbers(1, 'password must contain at least 1 number')
    .minSymbols(1, 'password must contain at least 1 special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  acceptTC: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed<FileList>()
    .test('fileExists', 'Upload a file', (file) => {
      if (file && file.length) {
        return file && file.length !== 0;
      }
      return false;
    })
    .test('fileSize', 'File size is too large', (file) => {
      if (file && file.length) {
        return file[0].size <= 1048576; // 1MB
      }
      return false;
    })
    .test('fileType', 'Invalid file format', (file) => {
      if (file && file.length) {
        return ['image/png', 'image/jpg'].includes(file[0].type);
      }
      return false;
    }),
  country: yup.string().required('Country is required'),
});

function ReactHookForm() {
  const country = useSelector(
    (state: { countriesReducer: ICountriesState }) =>
      state.countriesReducer.currentCountry
  );

  console.log(country);

  const formType = FormNames.hookForm;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [pictureBase64, setPictureBase64] = useState('');

  const onSubmit = (data: IFormState) => {
    dispatch(setFormData({ data, pictureBase64, formType }));
    navigate('/', { state: { formType } } as LastFormType);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictureBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPictureBase64('');
    }
  };

  return (
    <div className="container">
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">
            Name:
            <input {...register('name')} type="text" id="name" />
          </label>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">
            Age:
            <input {...register('age')} type="text" id="age" />
          </label>
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input {...register('email')} type="text" id="email" />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input {...register('password')} type="password" id="password" />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
            />
          </label>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="flex-row">
          <span>Gender:</span>
          <div>
            <label htmlFor="male">
              Male
              <input
                {...register('gender')}
                type="radio"
                value="male"
                id="male"
              />
            </label>
          </div>
          <div>
            <label htmlFor="female">
              Female
              <input
                {...register('gender')}
                type="radio"
                value="female"
                id="female"
              />
            </label>
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div>
          <label htmlFor="acceptTC">
            Accept Terms and Conditions
            <input {...register('acceptTC')} type="checkbox" id="acceptTC" />
          </label>
        </div>
        {errors.acceptTC && <p>{errors.acceptTC.message}</p>}
        <div>
          <label htmlFor="picture">
            Upload Picture:
            <input
              {...register('picture')}
              type="file"
              id="picture"
              accept=".png, .jpeg"
              onChange={handlePictureChange}
            />
          </label>
          {pictureBase64 && (
            <img
              src={pictureBase64}
              alt="Preview"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        {errors.picture && <p>{errors.picture.message}</p>}
        <div>
          <label htmlFor="country">
            Select Country:
            <CustomSelect />
            <select
              id="country"
              {...register('country')}
              style={{ opacity: '0', width: 0 }}
            >
              <option key={country} value={country} selected>
                {country}
              </option>
            </select>
          </label>
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <button disabled={!isDirty || !isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReactHookForm;
