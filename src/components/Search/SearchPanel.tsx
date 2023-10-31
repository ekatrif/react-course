import { useEffect } from 'react';
import classes from './SearchPanel.module.scss';

interface IProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
  startSearch: () => void;
}

const SearchPanel = ({ searchText, setSearchText, startSearch }: IProps) => {
  const changeSearchText = () => {
    localStorage.setItem('searchText', searchText);
  };

  const getSearchText = () => {
    if (localStorage.getItem('searchText')) {
      const searchText = localStorage.getItem('searchText') as string;
      setSearchText(searchText);
    }
  };

  useEffect(() => {
    getSearchText();
  }, []);

  useEffect(() => {
    changeSearchText();
  }, [searchText]);

  const handleClick = () => {
    startSearch();
  };

  return (
    <div className={classes.search}>
      <input
        className={classes.search__input}
        type="search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <button
        className={classes.search__button}
        type="button"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchPanel;
