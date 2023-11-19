import { useNavigate, useParams } from 'react-router-dom';
import DetailedBlock from '../../components/DetailedBlock/DetailedBlock';
import SearchPanel from '../../components/Search/SearchPanel';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import { useSelector } from '../../store/index';
import { useGetCardsQuery } from '../../store/reducers/apiSlice';
import classes from './MainPage.module.scss';

const MainPage = () => {
  const { searchText, page, cardsPerPage } = useSelector(
    (state) => state.mainReducer
  );

  const { isLoading, isError } = useGetCardsQuery({
    searchText,
    page,
    cardsPerPage,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleCloseDetails = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLDivElement;
    if (id && !clickedElement.classList.contains('cardTitle')) {
      navigate('/');
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
