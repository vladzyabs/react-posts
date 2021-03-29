import React          from 'react';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

import { formatDate } from '../../utils';

PostCard.propTypes = {
  id:           PropTypes.string,
  body:         PropTypes.string,
  createAt:     PropTypes.string,
  commentCount: PropTypes.number,
  likeCount:    PropTypes.number,
  title:        PropTypes.string,
  username:     PropTypes.string,
};

export default function PostCard(props) {
  const {body, createAt, commentCount, likeCount, title, username} = props;

  return (
    <div className={'post-card'}>
      <h4 className={'title'}>{title}</h4>
      <div className={'username'}>{username}</div>
      <div className={'date'}>{formatDate(createAt)}</div>

      <div className={'content'}>
        {body.length >= 50 ? `${body.substr(0, 50)}...` : body}
      </div>

      <div className={'information'}>
        <span>❤{' '}{likeCount}</span>
        <span>💬{' '}{commentCount}</span>
      </div>
    </div>
  );
}