import { Link } from 'react-router-dom';
import classes from './Card.module.scss';

interface IData {
  center: string;
  title: string;
  photographer: string;
  keywords: string[];
  location: string;
  nasa_id: string;
  media_type: string;
  date_created: string;
  description: string;
}

interface ILink {
  href: string;
  rel: string;
  render: string;
}

export interface ICard {
  href: string;
  data: IData[];
  links: ILink[];
}

interface IProps {
  card: ICard;
  id: number;
}

const Card = ({ card, id }: IProps) => {
  const { title } = card.data[0];
  const { description } = card.data[0];

  return (
    <li data-testid="card">
      <Link key={title} to={`article/${id}`}>
        <h3 className="cardTitle">{title}</h3>
      </Link>
      <div className={classes.description}>{description}</div>
    </li>
  );
};

export default Card;
