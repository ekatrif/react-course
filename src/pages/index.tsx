import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { wrapper } from '../store';
import { getData, getRunningQueriesThunk } from '../services/api';
import MainPage, { IProps } from '../components/MainPage';
import { resolveRouterElement } from '../utils/resolveRouterElement';
import { CARDS_PER_PAGE } from '../settings';

export interface IQueryParams extends ParsedUrlQuery {
  q: string;
  page: string;
  page_size: string;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { q, page, page_size } = context.query as IQueryParams;

    let initialSearchText = '';

    if (typeof window !== 'undefined') {
      initialSearchText = localStorage.getItem('searchText') || '';
    }

    const data = await store.dispatch(
      getData.initiate({
        searchText: resolveRouterElement(q, initialSearchText),
        page: Number(resolveRouterElement(page, '1')),
        cardsPerPage: Number(
          resolveRouterElement(page_size, CARDS_PER_PAGE[0].toString())
        ),
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data,
      },
    };
  });

const IndexPage: FC<IProps> = ({ data }) => <MainPage data={data} />;

export default IndexPage;
