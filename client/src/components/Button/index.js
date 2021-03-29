import React          from 'react';
import classNames     from 'classnames';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

Button.propTypes = {
  children:  PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default function Button({children, className, ...otherProps}) {
  return (
    <button className={classNames('btn', className)} {...otherProps}>{children}</button>
  );
}