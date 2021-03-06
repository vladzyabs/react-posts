import React                 from 'react';
import classNames            from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import './scss/style.scss';

import PATHS       from '../../paths';
import { useAuth } from '../../context';

import Container from '../@ui/Container';

function Header() {
  const {user, logout}      = useAuth();
  const {pathname}          = useLocation();
  const [active, setActive] = React.useState();
  const path                = pathname === '/' ? 'home' : pathname.slice(1);

  React.useEffect(() => {
    setActive(path);
  }, [pathname, path]);

  const handleClick = ({target: {name}}) => {
    setActive(name);
  };

  return (
    <header className={'header'}>
      <Container>
        <nav className={'navigation'}>
          <ul>
            {user ? (
              <>
                <li><Link to={PATHS.HOME}>{user.username}</Link></li>
                <li><Link to={PATHS.LOGIN} onClick={logout}>Logout</Link></li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className={classNames({'active': active === 'home'})}
                    to={PATHS.HOME}
                    onClick={handleClick}
                    name={'home'}
                  >Home</Link>
                </li>
                <li>
                  <Link
                    className={classNames({'active': active === 'login'})}
                    to={PATHS.LOGIN}
                    onClick={handleClick}
                    name={'login'}
                  >login</Link>
                </li>
                <li>
                  <Link
                    className={classNames({'active': active === 'register'})}
                    to={PATHS.REGISTER}
                    onClick={handleClick}
                    name={'register'}
                  >register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default React.memo(Header);