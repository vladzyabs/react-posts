import React          from 'react';
import classNames     from 'classnames';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

Filed.propTypes = {
  classNames: PropTypes.string,
  error:      PropTypes.string,
  label:      PropTypes.string,
};

export default function Filed({className, error, label, ...otherProps}) {
  return (
    <div className={classNames('field-wrapper', className)}>
      {label && (
        <label>{label}</label>
      )}
      <input type='text' {...otherProps} />
      {error && (
        <span>{error}</span>
      )}
    </div>
  );
}