import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context';
import { Actions } from '../../reducer/types';
import { CARDS_PER_PAGE } from '../../settings';
import classes from './Pagination.module.scss';

const Pagination = () => {
  const { state, dispatch } = useContext(AppContext);
  const { page, pages, cardsPerPage } = state;

  const navigate = useNavigate();

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: Actions.SET_CARDS_PER_PAGE,
      payload: +e.target.value,
    });
    dispatch({
      type: Actions.SET_PAGE,
      payload: 1,
    });
    navigate('/');
  };

  const handlePrevPage = () => {
    dispatch({
      type: Actions.SET_PAGE,
      payload: page - 1,
    });
  };

  const handleNextPage = () => {
    dispatch({
      type: Actions.SET_PAGE,
      payload: page + 1,
    });
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
