import { useEffect, useContext } from 'react';
import { AppContext } from '../../context';
import { Actions } from '../../reducer/types';
import classes from './SearchPanel.module.scss';
import ErrorButton from '../ErrorButton/ErrorButton';
import { Endpoints } from '../../api';

const SearchPanel = () => {
  const { state, dispatch } = useContext(AppContext);
  const { searchText, page, cardsPerPage, cardsCount, cards } = state;

  const getSearchText = () => {
    if (localStorage.getItem('searchText')) {
      const searchText = localStorage.getItem('searchText') as string;
      dispatch({
        type: Actions.SET_SEARCH_TEXT,
        payload: searchText,
      });
    }
  };

  const fetchCards = () => {
    dispatch({
      type: Actions.SET_ISLOADING,
      payload: true,
    });
    fetch(
      `${
        Endpoints.SEARCH_PHOTOS + searchText
      }&page=${page}&page_size=${cardsPerPage}`
    )
      .then((response) => response.json())
      .then((cards) => {
        dispatch({
          type: Actions.SET_FETCH_SUCCESS,
          payload: cards,
        });
      })
      .catch(() => {
        dispatch({
          type: Actions.SET_FETCH_ERROR,
          payload: {},
        });
      });
  };

  const changeUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
  };

  useEffect(() => {
    fetchCards();
    changeUrl();
  }, [page, cardsPerPage]);

  useEffect(() => {
    // How many pages (total)
    dispatch({
      type: Actions.SET_PAGES,
      payload: Math.ceil(cardsCount / cardsPerPage),
    });
  }, [cards]);

  useEffect(() => {
    getSearchText();
    fetchCards();
  }, []);

  const handleClick = () => {
    fetchCards();
  };

  const saveSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Actions.SET_SEARCH_TEXT,
      payload: e.target.value,
    });
    localStorage.setItem('searchText', e.target.value);
  };

  return (
    <form action="" className={classes.search}>
      <input
        className={classes.search__input}
        type="search"
        value={searchText}
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
