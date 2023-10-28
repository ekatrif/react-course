import { Component } from 'react';
import classes from './Cards.module.scss';
import Card, { ICard } from '../Card/Card';

interface IProps {
  cards: ICard[];
}

class Cards extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { cards } = this.props;

    return (
      <ul className={classes.cards}>
        {cards.map((card) => (
          <Card key={card.url} card={card} />
        ))}
      </ul>
    );
  }
}

export default Cards;
