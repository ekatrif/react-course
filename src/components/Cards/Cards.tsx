import classes from './Cards.module.scss';
import Card, { ICard } from '../Card/Card';

interface IProps {
  cards: ICard[];
}

const Cards = ({ cards }: IProps) => {
  return cards.length ? (
    <ul className={classes.cards}>
      {cards.map((card) => (
        <Card key={card.url} card={card} />
      ))}
    </ul>
  ) : (
    <h2>Nothing found.</h2>
  );
};

export default Cards;
