import { Component } from 'react';
import classes from './SearchPanel.module.scss';

interface IProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
}

class SearchPanel extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.getSearchText();
    window.addEventListener('beforeunload', this.setSearchText);
  }

  componentWillUnmount() {
    this.setSearchText();
    window.removeEventListener('beforeunload', this.setSearchText);
  }

  setSearchText = () => {
    const { searchText } = this.props;
    localStorage.setItem('searchText', searchText);
  };

  getSearchText() {
    if (localStorage.getItem('searchText')) {
      const { setSearchText } = this.props;
      const searchText = localStorage.getItem('searchText') as string;
      setSearchText(searchText);
    }
  }

  render() {
    const { searchText } = this.props;
    const { setSearchText } = this.props;
    return (
      <div className={classes.search}>
        <input
          className={classes.search__input}
          type="search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button className={classes.search__button} type="button">
          Search
        </button>
      </div>
    );
  }
}

export default SearchPanel;
