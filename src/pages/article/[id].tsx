import { FC } from 'react';
import { GetServerSideProps } from 'next';
import MainPage, { IProps } from '../../components/MainPage';
import { wrapper } from '../../store';
import { getData, getRunningQueriesThunk } from '../../services/api';
import { resolveRouterElement } from '../../utils/resolveRouterElement';
import { CARDS_PER_PAGE } from '../../settings';
import { IQueryParams } from '..';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { q, page, page_size } = context.query as IQueryParams;

    const data = await store.dispatch(
      getData.initiate({
        searchText: resolveRouterElement(q, ''),
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

const DetailedPage: FC<IProps> = ({ data }) => <MainPage data={data} />;

export default DetailedPage;
