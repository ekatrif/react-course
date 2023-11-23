import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../store/index';
import { CARDS_PER_PAGE } from '../settings';
import { setCardsPerPage, setPage } from '../store/reducers/mainSlice';
import classes from '../styles/pagination.module.scss';

const Pagination = () => {
  const router = useRouter();

  const { id } = router.query;

  const { page, pages, cardsPerPage } = useSelector(
    (state) => state.mainReducer
  );

  const dispatch = useDispatch();

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCardsPerPage(+e.target.value));
    dispatch(setPage(1));
    router.push('/');
  };

  useEffect(() => {
    const queryParams = { id, page, cardsPerPage };
    router.push({ query: queryParams });
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
