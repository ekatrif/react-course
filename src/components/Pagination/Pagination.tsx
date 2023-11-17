import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../store/index';
import { CARDS_PER_PAGE } from '../../settings';
import { setCardsPerPage, setPage } from '../../store/reducers/mainSlice';
import classes from './Pagination.module.scss';

const Pagination = () => {
  const { page, pages, cardsPerPage } = useSelector(
    (state) => state.mainReducer
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCardsPerPage(+e.target.value));
    dispatch(setPage(1));
    navigate('/');
  };

  const changeUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
  };

  useEffect(() => {
    changeUrl();
  }, [page, cardsPerPage]);

  const handlePrevPage = () => {
    dispatch(setPage(page - 1));
  };

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className={classes.pagination}>
      <ul className={classes.pagination__navigation}>
        <li key="prev">
          <button type="button" disabled={page === 1} onClick={handlePrevPage}>
            Previous
          </button>
        </li>
        <li key="next">
          <button
            type="button"
            disabled={page === pages}
            onClick={handleNextPage}
            data-testid="next"
          >
            Next
          </button>
        </li>
      </ul>
      <select
        className={classes.pagination__pages}
        value={cardsPerPage}
        onChange={handleOptionChange}
      >
        {CARDS_PER_PAGE.map((number) => (
          <option key={number} value={number}>
            Cards per page: {number}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
