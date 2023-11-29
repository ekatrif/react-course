import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setFormData } from '../../store/reducers/reactHookFormSlice';
import { countries } from '../../store/reducers/types';

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
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  acceptTC: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .required('Picture is required')
    .test('fileSize', 'File size is too large', (value) => {
      if (!value?.length) return true;
      return value[0].size <= 1048576; // 1MB
    })
    .test('fileType', 'Invalid file format', (value) => {
      if (!value?.length) return true;
      return ['image/png', 'image/jpeg'].includes(value[0].type);
    }),
});

function ReactHookForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(setFormData(data));
  };

  const [picturePreview, setPicturePreview] = useState('');

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      // dispatch(setPicture(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // dispatch(setPicture(null));
      setPicturePreview('');
    }
  };

  return (
    <div className="container">
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input {...register('name')} type="text" id="name" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input {...register('age')} type="text" id="age" />
          {errors.age && <p>{errors.age.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input {...register('email')} type="text" id="email" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input {...register('password')} type="password" id="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="one-row-baseline">
          <label>Gender:</label>
          <div className="one-row-baseline">
            <input
              {...register('gender')}
              type="radio"
              value="male"
              id="male"
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="one-row-baseline">
            <input
              {...register('gender')}
              type="radio"
              value="female"
              id="female"
            />
            <label htmlFor="female">Female</label>
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>
        <div className="one-row-baseline">
          <input {...register('acceptTC')} type="checkbox" id="acceptTC" />
          <label htmlFor="acceptTC">Accept Terms and Conditions</label>
        </div>
        {errors.acceptTC && <p>{errors.acceptTC.message}</p>}
        <div className="one-row-center">
          <label htmlFor="picture">Upload Picture:</label>
          <input
            {...register('picture')}
            type="file"
            id="picture"
            accept=".png, .jpeg"
            onChange={handlePictureChange}
          />
          {errors.picture && <p>{errors.picture.message}</p>}
          {picturePreview && (
            <img
              src={picturePreview}
              alt="Preview"
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
        <div className="one-row-baseline">
          <label htmlFor="country">Select Country:</label>
          <select {...register('country')} id="country">
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
            {/* Render options for countries */}
          </select>
          {errors.country && <p>{errors.country.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReactHookForm;
