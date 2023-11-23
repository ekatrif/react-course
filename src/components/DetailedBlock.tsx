import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from '../store/index';

import classes from '../styles/detailedBlock.module.scss';

const DetailedBlock = () => {
  const router = useRouter();

  const { cards } = useSelector((state) => state.mainReducer);

  const { id } = router.query;

  const title = id ? cards[+id - 1]?.data[0].title : '';
  const description = id ? cards[+id - 1]?.data[0].description : '';
  const photo = id ? cards[+id - 1]?.links[0].href : '';

  return (
    <div className={classes.wrapper} data-testid="detailed">
      <div className={classes.close}>
        <Link href="/" passHref data-testid="close-button">
          х
        </Link>
      </div>
      <h3 data-testid="detailed-title">{title}</h3>
      <img src={photo} width="300px" alt="" />
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default DetailedBlock;
