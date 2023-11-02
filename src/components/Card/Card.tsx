import { Link } from 'react-router-dom';
import classes from './Card.module.scss';

export interface ICard {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface IProps {
  card: ICard;
  id: number;
}

const Card = ({ card, id }: IProps) => {
  const { name, diameter, climate, terrain } = card;

  return (
    <li>
      <Link key={name} to={`planet/${id}`}>
        <h3>{name}</h3>
      </Link>
      <ul className={classes.list}>
        <li>
          <span>Diameter: </span>
          {diameter}
        </li>
        <li>
          <span>Climate: </span>
          {climate}
        </li>
        <li>
          <span>Terrain: </span>
          {terrain}
        </li>
      </ul>
    </li>
  );
};

export default Card;
