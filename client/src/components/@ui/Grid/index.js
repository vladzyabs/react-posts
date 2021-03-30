import React from 'react';

import './scss/style.scss';

export default function Grid({children}) {
  return (
    <div className={'grid'}>{children}</div>
  );
}