import { useState, useEffect } from 'react';
import './App.scss';
import SearchPanel from './components/Search/SearchPanel';
import Cards from './components/Cards/Cards';
import ErrorButton from './components/ErrorButton/ErrorButton';

enum Endpoints {
  SEARCH_PLANETS = 'https://swapi.dev/api/planets/?search=',
}

const App = () => {
  const [searchText, setSearchText] = useState(
    localStorage.getItem('searchText') || ''
  );
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="wrapper">
      <header>
        <SearchPanel
          searchText={searchText}
          setSearchText={(searchText) => setSearchText(searchText)}
          startSearch={fetchCards}
        />
      </header>
      <main>
        <ErrorButton />

        {isLoading ? <h2>Loading ....</h2> : <Cards cards={cards} />}
      </main>
    </div>
  );
};

export default App;
