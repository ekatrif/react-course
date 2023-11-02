import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchPanel from '../../components/Search/SearchPanel';
import Cards from '../../components/Cards/Cards';
import DetailedInfo from '../../components/DetailedInfo/DetailedInfo';
import { Endpoints } from '../../api';
import classes from './MainPage.module.scss';

const Main = () => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const fetchCards = () => {
    setIsLoading(true);
    fetch(Endpoints.SEARCH_PLANETS + searchText)
      .then((response) => response.json())
      .then((cards) => {
        setCards(cards.results);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.leftColumn}>
        <header>
          <SearchPanel
            searchText={searchText}
            setSearchText={(searchText) => setSearchText(searchText)}
            startSearch={fetchCards}
          />
        </header>
        <main>
          {isLoading ? <h2>Loading ....</h2> : <Cards cards={cards} />}
        </main>
      </div>
      {id ? (
        <div className={classes.mainColumn}>
          <DetailedInfo />
        </div>
      ) : null}
    </div>
  );
};

export default Main;
