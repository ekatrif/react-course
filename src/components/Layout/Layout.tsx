import { NavLink, Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';

function Layout() {
  return (
    <div className={classes.appwrapper}>
      <header className={classes.header__wrapper} data-testid="header">
        <NavLink className={classes.nav__link} to="/">
          Main
        </NavLink>

        <NavLink className={classes.nav__link} to="/simple-form">
          Simple Form
        </NavLink>

        <NavLink className={classes.nav__link} to="/react-hook-form">
          React Hook Form
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
}

export default Layout;
