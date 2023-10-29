import { Component } from 'react';
import './App.scss';
import SearchPanel from './components/Search/SearchPanel';
import Cards from './components/Cards/Cards';
import { ICard } from './components/Card/Card';
import ErrorButton from './components/ErrorButton/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

interface IState {
  searchText: string;
  cards: ICard[];
  isLoading: boolean;
}

enum Endpoints {
  SEARCH_PLANETS = 'https://swapi.dev/api/planets/?search=',
}

class App extends Component<Record<string, ICard[] | never>, IState> {
  constructor(props: Record<string, ICard[] | never>) {
    super(props);
    this.state = {
      searchText: localStorage.getItem('searchText') || '',
      cards: [],
      isLoading: false,
    };
    this.fetchCards = this.fetchCards.bind(this);
  }

  componentDidMount() {
    this.fetchCards();
  }

  fetchCards() {
    const { searchText } = this.state;
    this.setState({ isLoading: true });
    fetch(Endpoints.SEARCH_PLANETS + searchText)
      .then((response) => response.json())
      .then((cards) => {
        this.setState({ cards: cards.results });
        this.setState({ isLoading: false });
      });
  }

  changeSearchText(searchText: string) {
    this.setState({ searchText });
  }

  render() {
    const { searchText, cards, isLoading } = this.state;
    return (
      <>
        <header>
          <ErrorBoundary>
            <SearchPanel
              searchText={searchText}
              setSearchText={(searchText: string) => {
                this.changeSearchText(searchText);
              }}
              startSearch={this.fetchCards}
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
  }
}

export default App;
