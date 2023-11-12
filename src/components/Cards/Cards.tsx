import { useContext } from 'react';
import Card from '../Card/Card';
import { AppContext } from '../../context';
import classes from './Cards.module.scss';

const Cards = () => {
  const { state } = useContext(AppContext);
  const { cards } = state;

  return cards.length ? (
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
