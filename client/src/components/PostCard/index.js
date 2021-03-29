import React          from 'react';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

import { formatDate } from '../../utils';
import Button         from '../Button';

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
  const {id, body, createAt, commentCount, likeCount, title, username} = props;

  const history = useHistory();

  const showPost = () => {
    history.push(`/posts/${id}`);
  };

  return (
    <div className={'post-card'}>
      <h4 className={'title'}>{title}</h4>
      <div className={'username'}>{username}</div>
      <div className={'date'}>{formatDate(createAt)}</div>

      <div className={'content'}>
        {body.length >= 50 ? `${body.substr(0, 50)}...` : body}
      </div>

      <Button onClick={showPost}>Подробнее</Button>

      <div className={'information'}>
        <span>❤{' '}{likeCount}</span>
        <span>💬{' '}{commentCount}</span>
      </div>
    </div>
  );
}