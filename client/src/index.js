import React      from 'react';
import { render } from 'react-dom';

import './assets/scss/style.scss';

import ApolloProvider from './ApolloProvider';

const $root = document.getElementById('root');

render(
  <React.StrictMode>
    <ApolloProvider />
  </React.StrictMode>,
  $root,
);
