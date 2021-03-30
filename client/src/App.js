import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PATHS            from './paths';
import {
  Home,
  Login,
  Post,
  Register,
}                       from './pages';
import { Header }       from './components';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path={PATHS.HOME} component={Home} />
          <Route exact path={PATHS.LOGIN} component={Login} />
          <Route exact path={PATHS.REGISTER} component={Register} />
          <Route exact path={'/posts/:postId'} component={Post} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
