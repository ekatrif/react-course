import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from '../store/index';
import ErrorButton from './ErrorButton';
import { setSearchText } from '../store/reducers/mainSlice';
import classes from '../styles/searchPanel.module.scss';

const SearchPanel = () => {
  const { searchText } = useSelector((state) => state.mainReducer);

  const [inputText, setInputText] = useState(searchText);

  useEffect(() => {
    setInputText(searchText);
  }, [searchText]);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    localStorage.setItem('searchText', inputText);
    dispatch(setSearchText(inputText));
    const queryParams = { ...router.query, q: inputText };
    router.push({ query: queryParams });
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
