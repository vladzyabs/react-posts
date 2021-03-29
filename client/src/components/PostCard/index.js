import React          from 'react';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

import { formatDate } from '../../utils';

PostCard.propTypes = {
  id:           PropTypes.string,
  createAt:     PropTypes.string,
  body:         PropTypes.string,
  username:     PropTypes.string,
  likeCount:    PropTypes.number,
  commentCount: PropTypes.number,
};

export default function PostCard(props) {
  const {body, createAt, username, likeCount, commentCount} = props;

  return (
    <div style={{border: '1px solid #000'}}>
      <div>user: {username}</div>
      <div>date: {formatDate(createAt)}</div>
      <div>content: {body}</div>
      <div>
        <span>❤{likeCount}</span>{'  '}
        <span>💬{commentCount}</span>
      </div>
    </div>
  );
}