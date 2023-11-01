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
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    if (error) throw new Error();
    return (
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
