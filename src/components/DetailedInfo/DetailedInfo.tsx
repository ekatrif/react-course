import { Link, useParams } from 'react-router-dom';
import { ICard } from '../Card/Card';
import classes from './DetailedInfo.module.scss';

interface IProps {
  cards: ICard[];
}

const DetailedInfo = ({ cards }: IProps) => {
  const { id } = useParams();

  const title = id ? cards[+id - 1].data[0].title : '';
  const description = id ? cards[+id - 1].data[0].description : '';
  const photo = id ? cards[+id - 1].links[0].href : '';

  return (
    <div className={classes.wrapper}>
      <div className={classes.close}>
        <Link key={id} to="/">
          х
        </Link>
      </div>
      <h3>{title}</h3>
      <img src={photo} width="300px" alt="" />
      <div className={classes.description}>{description}</div>
    </div>
  );
};

export default DetailedInfo;
