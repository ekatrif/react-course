import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { setupStore } from './store';
import MainPage from './pages/MainPage/MainPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';

const AppWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />}>
          <Route path="article/:id" element={<MainPage />} />
          <Route
            path="articles"
            element={<Navigate to="article/1" replace />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};

export default App;
