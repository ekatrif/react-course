import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setupStore } from './store';
import MainPage from './pages/MainPage/MainPage';
import Layout from './components/Layout/Layout';
import SimpleForm from './pages/SimpleFrom/SimpleForm';
import ReactHookForm from './pages/ReactHookFrom/ReactHookForm';

function AppWrapper() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/simple-form" element={<SimpleForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
      </Route>
    </Routes>
  );
}

const store = setupStore();

function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;
