import { useState } from 'react';
import classes from '../Search/SearchPanel.module.scss';

const ErrorButton = () => {
  const [error, setError] = useState(false);

  const handleClick = () => {
    setError(true);
  };

  if (error) throw new Error();

  return (
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
