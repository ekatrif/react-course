import { useState, useEffect } from 'react';
import './App.scss';
import SearchPanel from './components/Search/SearchPanel';
import Cards from './components/Cards/Cards';
import ErrorButton from './components/ErrorButton/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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
    <>
      <header>
        <ErrorBoundary>
          <SearchPanel
            searchText={searchText}
            setSearchText={(searchText) => setSearchText(searchText)}
            startSearch={fetchCards}
          />
        </ErrorBoundary>
      </header>
      <main>
        <ErrorBoundary>
          <ErrorButton />
        </ErrorBoundary>
        <ErrorBoundary>
          {isLoading ? <h2>Loading ....</h2> : <Cards cards={cards} />}
        </ErrorBoundary>
      </main>
    </>
  );
};

export default App;
