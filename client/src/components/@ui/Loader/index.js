import React from 'react';

import './scss/style.scss'

export default function Loader() {
  return (
    <div className={'ui-loader'}>
      <span>Загрузка...</span>
    </div>
  );
}