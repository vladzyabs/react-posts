import { NavLink } from 'react-router-dom';

import './scss/style.scss';

import PATHS from '../../paths';

export default function Header() {
  return (
    <header className={'header'}>
      <nav className={'navigation'}>
        <ul>
          <li><NavLink to={PATHS.HOME}>Home</NavLink></li>
          <li><NavLink to={PATHS.LOGIN}>login</NavLink></li>
          <li><NavLink to={PATHS.REGISTER}>register</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}