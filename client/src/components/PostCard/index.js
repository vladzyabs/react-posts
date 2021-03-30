import React          from 'react';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';

import './scss/style.scss';

import { formatDate } from '../../utils';

import Button           from '../@ui/Button';
import { Delete, Like } from '../Buttons';

PostCard.propTypes = {
  id:           PropTypes.string,
  body:         PropTypes.string,
  createAt:     PropTypes.string,
  commentCount: PropTypes.number,
  likeCount:    PropTypes.number,
  likes:        PropTypes.array,
  title:        PropTypes.string,
  username:     PropTypes.string,
};

function PostCard(props) {
  const {id, body, createAt, currentUserId, commentCount, likeCount, likes, title, user, username} = props;

  const isOwnerPost = currentUserId && currentUserId === user;

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
        <Like
          currentUserId={currentUserId}
          post={{
            likeCount,
            likes,
            postId: id,
          }}
        />
        <span>💬{' '}{commentCount}</span>
        {isOwnerPost && (
          <Delete postId={id} />
        )}
      </div>
    </div>
  );
}

export default React.memo(PostCard);