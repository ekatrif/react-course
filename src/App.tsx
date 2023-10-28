import { Component } from 'react';
import './App.scss';
import SearchPanel from './components/Search/SearchPanel';
import Cards from './components/Cards/Cards';
import { ICard } from './components/Card/Card';

interface IState {
  searchText: string;
  cards: ICard[];
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
    };
    this.fetchCards = this.fetchCards.bind(this);
  }

  componentDidMount() {
    this.fetchCards();
  }

  fetchCards() {
    const { searchText } = this.state;
    fetch(Endpoints.SEARCH_PLANETS + searchText)
      .then((response) => response.json())
      .then((cards) => {
        this.setState({ cards: cards.results });
      });
  }

  changeSearchText(searchText: string) {
    this.setState({ searchText });
  }

  render() {
    const { searchText, cards } = this.state;
    return (
      <>
        <header>
          <SearchPanel
            searchText={searchText}
            setSearchText={(searchText: string) => {
              this.changeSearchText(searchText);
            }}
            startSearch={this.fetchCards}
          />
        </header>
        <main>
          <Cards cards={cards} />
        </main>
      </>
    );
  }
}

export default App;
