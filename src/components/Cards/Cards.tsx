import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../store/index';
import Card, { ICard } from '../Card/Card';
import { useGetCardsQuery } from '../../store/reducers/apiSlice';
import {
  setCards,
  setCardsCount,
  setPages,
} from '../../store/reducers/mainSlice';
import classes from './Cards.module.scss';

const Cards = () => {
  const { searchText, page, cardsPerPage, cardsCount } = useSelector(
    (state) => state.mainReducer
  );

  const dispatch = useDispatch();

  const { data } = useGetCardsQuery({
    searchText,
    page,
    cardsPerPage,
  });

  const cards = data?.collection.items as ICard[];

  useEffect(() => {
    if (data) {
      dispatch(setCards(data.collection.items));
      dispatch(setCardsCount(+data.collection.metadata.total_hits));
      dispatch(setPages(Math.ceil(cardsCount / cardsPerPage)));
    }
  }, [cards]);

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
