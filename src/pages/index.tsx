import { useRouter } from 'next/router';
import DetailedBlock from '../components/DetailedBlock';
import SearchPanel from '../components/SearchPanel';
import Cards from '../components/Cards';
import Pagination from '../components/Pagination';
import { useSelector } from '../store/index';
import { useGetCardsQuery } from '../services/api';
import classes from '../styles/mainPage.module.scss';

const MainPage = () => {
  const router = useRouter();
  const { searchText, page, cardsPerPage } = useSelector(
    (state) => state.mainReducer
  );

  const { isLoading, isError } = useGetCardsQuery({
    searchText,
    page,
    cardsPerPage,
  });

  const { id } = router.query;

  const handleCloseDetails = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLElement;
    if (id && !clickedElement.classList.contains('cardTitle')) {
      router.push('/');
    }
  };

  return (
    <>
      <div
        className={classes.mainblock}
        onClick={handleCloseDetails}
        data-testid="main-block"
      >
        <div>
          <SearchPanel data-testid="search" />
        </div>
        {isError && <h2>Error while fetching.</h2>}
        {isLoading ? <h2>Loading ....</h2> : <Cards />}
        {isLoading ? null : <Pagination />}
      </div>
      {id ? (
        <div className={classes.rightColumn}>
          <DetailedBlock />
        </div>
      ) : null}
    </>
  );
};

export default MainPage;
