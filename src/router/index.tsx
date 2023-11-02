import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Main from '../pages/MainPage/MainPage';
import DetailedInfo from '../components/DetailedInfo/DetailedInfo';

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
            path: 'planet/:id',
            Component: DetailedInfo,
          },
        ],
      },
    ],
  },
]);

export default router;
