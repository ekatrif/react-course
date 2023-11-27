import { FC, Suspense } from 'react';
import { useRouter } from 'next/router';
import DetailedBlock from './DetailedBlock';
import SearchPanel from './SearchPanel';
import Pagination from './Pagination';
import { ICard } from './Card';
import Cards from './Cards';
import classes from '../styles/mainPage.module.scss';

interface ILink {
  rel: string;
  prompt: string;
  href: string;
}

interface IData {
  data: {
    collection: {
      version: string;
      href: string;
      items: ICard[];
      metadata: {
        total_hits: number;
      };
      links?: ILink[];
    };
  };
}

export interface IProps {
  data: IData;
  id?: number;
}

const MainPage: FC<IProps> = ({ data }) => {
  const router = useRouter();

  const { id } = router.query;

  const handleCloseDetails = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLElement;
    if (id && !clickedElement.classList.contains('cardTitle')) {
      router.push('/');
    }
  };

  return (
    <>
      <div
        className={classes.mainblock}
        onClick={handleCloseDetails}
        data-testid="main-block"
      >
        <div>
          <SearchPanel data-testid="search" />
        </div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Cards cards={data?.data?.collection?.items} />
          <Pagination data={data} />
        </Suspense>
      </div>
      {id ? (
        <div className={classes.rightColumn}>
          <DetailedBlock cards={data?.data?.collection?.items} id={+id} />
        </div>
      ) : null}
    </>
  );
};

export default MainPage;
