import React          from 'react';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

export default function Container({children}) {
  return (
    <div className={'container'}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};