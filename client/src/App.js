import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import {
  Home,
  Login,
  Register,
} from './pages';

const PATHS = {
  HOME:     '/',
  LOGIN:    '/login',
  REGISTER: '/register',
};

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to={PATHS.HOME}>Home</Link>
        <Link to={PATHS.LOGIN}>login</Link>
        <Link to={PATHS.REGISTER}>register</Link>
      </div>
      <Switch>
        <Route exact path={PATHS.HOME} component={Home} />
        <Route exact path={PATHS.LOGIN} component={Login} />
        <Route exact path={PATHS.REGISTER} component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
