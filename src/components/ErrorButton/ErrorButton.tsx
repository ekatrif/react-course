import { useState } from 'react';
import classes from './ErrorButton.module.scss';

const ErrorButton = () => {
  const [error, setError] = useState(false);

  const handleClick = () => {
    setError(true);
  };

  if (error) throw new Error();

  return (
    <button
      className={classes.error__button}
      type="button"
      onClick={handleClick}
    >
      Oops
    </button>
  );
};

export default ErrorButton;
