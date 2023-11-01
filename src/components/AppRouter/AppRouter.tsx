import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import Layout from '../Layout/Layout';
import { routes } from '../../router';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />

        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
