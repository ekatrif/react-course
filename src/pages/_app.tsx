import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import { wrapper } from '../store';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </Provider>
  );
}
