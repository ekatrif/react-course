import { Link, useParams } from 'react-router-dom';
import { useSelector } from '../../store/index';

import classes from './DetailedBlock.module.scss';

const DetailedBlock = () => {
  const { cards } = useSelector((state) => state.mainReducer);

  const { id } = useParams();

  const title = id ? cards[+id - 1]?.data[0].title : '';
  const description = id ? cards[+id - 1]?.data[0].description : '';
  const photo = id ? cards[+id - 1]?.links[0].href : '';

  return (
    <div className={classes.wrapper} data-testid="detailed">
      <div className={classes.close}>
        <Link key={id} to="/" data-testid="close-button">
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
