import { useState } from 'react';
import classes from '../Search/SearchPanel.module.scss';

const ErrorButton = () => {
  const [error, setError] = useState(false);

  const handleClick = () => {
    try {
      throw new Error('Click on "Throw new error" button');
    } catch (error) {
      setError(true);
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return error ? (
    <h2>Something went wrong</h2>
  ) : (
    <button
      className={classes.search__button}
      type="button"
      onClick={handleClick}
    >
      Throw new error
    </button>
  );
};

export default ErrorButton;
