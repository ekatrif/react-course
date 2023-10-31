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
}

const Card = ({ card }: IProps) => {
  const rotationPeriod = card.rotation_period;
  const orbitalPeriod = card.orbital_period;
  const surfaceWater = card.surface_water;

  const { name, diameter, climate, terrain, population } = card;

  return (
    <li>
      <h3>{name}</h3>
      <ul className={classes.list}>
        <li>
          <span>Rotation period: </span>
          {rotationPeriod}
        </li>
        <li>
          <span>Orbital period: </span>
          {orbitalPeriod}
        </li>
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
        <li>
          <span>Surface water: </span>
          {surfaceWater}
        </li>
        <li>
          <span>Population: </span>
          {population}
        </li>
      </ul>
    </li>
  );
};

export default Card;
