import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailedBlock from '../../components/DetailedBlock/DetailedBlock';
import SearchPanel from '../../components/Search/SearchPanel';
import Cards from '../../components/Cards/Cards';
import { AppContext } from '../../context';
import Pagination from '../../components/Pagination/Pagination';
import classes from './MainPage.module.scss';

const MainPage = () => {
  const { state } = useContext(AppContext);
  const { isLoading } = state;

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
      <div className={classes.mainblock} onClick={handleCloseDetails}>
        <div>
          <SearchPanel />
        </div>
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
