import { Component } from 'react';
import './App.scss';
import SearchPanel from './components/Search/SearchPanel';

interface IState {
  searchText: string;
}

class App extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { searchText: '' };
  }

  changeSearchText(searchText: string) {
    this.setState({ searchText });
  }

  render() {
    const { searchText } = this.state;
    return (
      <>
        <header>
          <SearchPanel
            searchText={searchText}
            setSearchText={(searchText: string) => {
              this.changeSearchText(searchText);
            }}
          />
        </header>
        <main />
      </>
    );
  }
}

export default App;
