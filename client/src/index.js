import React      from 'react';
import { render } from 'react-dom';

import './index.css';

import ApolloProvider from './ApolloProvider';

const $root = document.getElementById('root');

render(
  <React.StrictMode>
    <ApolloProvider />
  </React.StrictMode>,
  $root,
);
