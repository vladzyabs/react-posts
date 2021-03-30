import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PATHS            from './paths';
import {
  CreatePost,
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
          <Route exact path={'/create-post'} component={CreatePost} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
