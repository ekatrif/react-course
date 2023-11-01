import { Component, ErrorInfo, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

interface IState {
  error: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return <h2>Something went wrong...</h2>;
    }
    return children;
  }
}

export default ErrorBoundary;
