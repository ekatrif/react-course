import Link from 'next/link';
import { ICard } from './Card';
import classes from '../styles/detailedBlock.module.scss';

export interface IProps {
  cards: ICard[];
  id: number;
}

const DetailedBlock: React.FC<IProps> = ({ cards, id }) => {
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
