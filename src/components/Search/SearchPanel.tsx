import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../store/index';
import ErrorButton from '../ErrorButton/ErrorButton';
import { setSearchText } from '../../store/reducers/mainSlice';
import classes from './SearchPanel.module.scss';

const SearchPanel = () => {
  const { searchText } = useSelector((state) => state.mainReducer);

  const [inputText, setInputText] = useState(searchText);

  useEffect(() => {
    setInputText(searchText);
  }, [searchText]);

  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.setItem('searchText', inputText);
    dispatch(setSearchText(inputText));
  };

  const saveSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('searchText', e.target.value);
    setInputText(e.target.value);
  };

  return (
    <form action="" className={classes.search}>
      <input
        className={classes.search__input}
        type="search"
        value={inputText}
        onChange={(e) => saveSearchText(e)}
        data-testid="search"
      />
      <button
        className={classes.search__button}
        type="submit"
        onClick={handleClick}
        data-testid="search-button"
      >
        Search
      </button>
      <ErrorButton />
    </form>
  );
};

export default SearchPanel;
