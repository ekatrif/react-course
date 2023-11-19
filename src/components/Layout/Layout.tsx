import { NavLink, Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={classes.appwrapper}>
      <header className={classes.header__wrapper} data-testid="header">
        <NavLink className={classes.nav__link} to="/">
          Main
        </NavLink>
      </header>
      <main className={classes.wrapper}>
        <Outlet />
      </main>
      <footer className="footer__wrapper" data-testid="footer">
        2023 RS School Ekatrif
      </footer>
    </div>
  );
};

export default Layout;
