import React           from 'react';
import { useMutation } from '@apollo/client';
import * as PropTypes  from 'prop-types';

import { graphql } from '../../../graphql';

import { Button } from '../../@ui';

LikeButton.propTypes = {
  currentUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  post:          PropTypes.shape({
    postId:    PropTypes.string,
    likeCount: PropTypes.number,
    likes:     PropTypes.array,
  }),
};

function LikeButton(props) {
  const {currentUserId, post: {postId, likeCount, likes}} = props;

  const [liked, setLiked] = React.useState(false);

  const [likePost, {loading}] = useMutation(graphql.LIKE_POST_MUTATION, {
    variables: {
      postId,
    },
  });

  React.useEffect(() => {
    if (currentUserId && likes.find(like => like.user === currentUserId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [currentUserId, likes]);

  const handleClick = React.useCallback(async () => {
    await likePost();
  }, [likePost]);

  return (
    <Button onClick={handleClick} disabled={loading}>
      {liked ? '🖤' : '🤍'}
      <span>{likeCount}</span>
    </Button>
  );
}

export default React.memo(LikeButton);