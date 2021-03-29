import React          from 'react';
import classNames     from 'classnames';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

Avatar.propTypes = {
  className: PropTypes.string,
  img:       PropTypes.string.isRequired,
  username:  PropTypes.string.isRequired,
};

export default function Avatar({className, img, username, otherProps}) {
  return (
    <img
      className={classNames('avatar', className)}
      src={img}
      alt={username}
      {...otherProps}
    />
  );
}