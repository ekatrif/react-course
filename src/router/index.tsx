import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Main from '../pages/MainPage/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/',
        Component: Main,
        children: [
          {
            path: 'article/:id',
            Component: Main,
          },
        ],
      },
    ],
  },
]);

export default router;
