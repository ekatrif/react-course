import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SearchPanel from '../../components/Search/SearchPanel';
import Cards from '../../components/Cards/Cards';
import DetailedInfo from '../../components/DetailedInfo/DetailedInfo';
import { Endpoints } from '../../api';
import classes from './MainPage.module.scss';

const CARDS_PER_PAGE = [5, 10, 15, 20];

const Main = () => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardsCount, setCardsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(CARDS_PER_PAGE[0]);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchCards = () => {
    setIsLoading(true);
    fetch(
      `${
        Endpoints.SEARCH_PHOTOS + searchText
      }&page=${page}&page_size=${cardsPerPage}`
    )
      .then((response) => response.json())
      .then((cards) => {
        // How many cards (total)
        setCardsCount(+cards.collection.metadata.total_hits);
        // How many pages (total)
        setPages(Math.ceil(cardsCount / cardsPerPage));
        // Cards info
        setCards(cards.collection.items);
        setIsLoading(false);
      });
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLDivElement;
    if (id && !clickedElement.classList.contains('cardTitle')) {
      navigate('/');
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCardsPerPage(+e.target.value);
    setPage(1);
    navigate('/');
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setPages(Math.ceil(cardsCount / cardsPerPage));
  }, [cardsCount]);

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

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftColumn} onClick={handleCloseDetails}>
        <header>
          <SearchPanel
            searchText={searchText}
            setSearchText={(searchText) => setSearchText(searchText)}
            startSearch={fetchCards}
          />
        </header>
        <main>
          {isLoading ? <h2>Loading ....</h2> : <Cards cards={cards} />}
          {isLoading ? null : (
            <div className={classes.pagination}>
              <ul className={classes.pagination__navigation}>
                <li key="prev">
                  <button
                    type="button"
                    disabled={page === 1}
                    onClick={handlePrevPage}
                  >
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
          )}
        </main>
      </div>
      {id ? (
        <div className={classes.mainColumn}>
          <DetailedInfo cards={cards} />
        </div>
      ) : null}
    </div>
  );
};

export default Main;
