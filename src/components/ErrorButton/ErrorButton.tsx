import { Component } from 'react';
import classes from '../Search/SearchPanel.module.scss';

interface IState {
  error: boolean;
}

class ErrorButton extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { error: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      throw new Error('Click on "Throw new error" button');
    } catch (error) {
      this.setState({
        error: true,
      });
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  render() {
    const { error } = this.state;
    return error ? (
      <h2>Something went wrong</h2>
    ) : (
      <button
        className={classes.search__button}
        type="button"
        onClick={this.handleClick}
      >
        Throw new error
      </button>
    );
  }
}

export default ErrorButton;
