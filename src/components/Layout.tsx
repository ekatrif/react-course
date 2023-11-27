import Link from 'next/link';
import classes from '../styles/layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.appwrapper}>
      <header className={classes.header__wrapper} data-testid="header">
        <Link className={classes.nav__link} href="/">
          Main
        </Link>
      </header>
      <main className={classes.wrapper}>{children}</main>
      <footer className="footer__wrapper" data-testid="footer">
        2023 RS School Ekatrif
      </footer>
    </div>
  );
};

export default Layout;
