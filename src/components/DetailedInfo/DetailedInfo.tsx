import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Endpoints } from '../../api';
import { ICard } from '../Card/Card';
import classes from './DetailedInfo.module.scss';

const DetailedInfo = () => {
  const { id } = useParams<'id'>();

  const [info, setInfo] = useState<ICard>({
    name: '',
    rotation_period: '',
    orbital_period: '',
    diameter: '',
    climate: '',
    gravity: '',
    terrain: '',
    surface_water: '',
    population: '',
    residents: [],
    films: [],
    created: '',
    edited: '',
    url: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCardInfo = () => {
    setIsLoading(true);
    fetch(Endpoints.PLANET_INFO + id)
      .then((response) => response.json())
      .then((cardInfo: ICard) => {
        setInfo(cardInfo);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCardInfo();
  }, [id]);

  const rotationPeriod = info.rotation_period;
  const orbitalPeriod = info.orbital_period;
  const surfaceWater = info.surface_water;

  const { name, diameter, climate, terrain, population } = info;

  return (
    <div className={classes.wrapper}>
      <div className={classes.close}>
        <Link key={name} to="/">
          х
        </Link>
      </div>

      {isLoading ? (
        <h2>Loading ....</h2>
      ) : (
        <>
          <h3>{name} - Detailed Info</h3>
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
        </>
      )}
    </div>
  );
};

export default DetailedInfo;
