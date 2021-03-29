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
    <div style={{border: '1px solid #000'}}>
      <h4>{title}</h4>
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