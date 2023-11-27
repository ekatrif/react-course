import Card, { ICard } from './Card';
import classes from '../styles/cards.module.scss';

export interface IProps {
  cards: ICard[];
}

const Cards: React.FC<IProps> = ({ cards }) => {
  return cards?.length ? (
    <ul className={classes.cards}>
      {cards.map((card, index) => (
        <Card key={card.href} card={card} id={index + 1} />
      ))}
    </ul>
  ) : (
    <h2>Nothing found.</h2>
  );
};

export default Cards;
