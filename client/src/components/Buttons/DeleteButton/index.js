import React           from 'react';
import { useMutation } from '@apollo/client';
import * as PropTypes  from 'prop-types';

import { graphql } from '../../../graphql';

import { Button } from '../../@ui';

DeleteButton.propTypes = {
  callback:      PropTypes.func,
  commentId:     PropTypes.string,
  currentUserId: PropTypes.string,
  postId:        PropTypes.string,
  ownerUserId:   PropTypes.string,
};

function DeleteButton({callback, commentId, currentUserId, postId, ownerUserId}) {
  const mutation = commentId ? graphql.DELETE_COMMENT_MUTATION : graphql.DELETE_POST_MUTATION;

  const [deleteElement, {loading}] = useMutation(mutation, {
    variables: {
      postId,
      commentId,
    },
    update(proxy) {
      const data = proxy.readQuery({query: graphql.FETCH_POSTS_QUERY});

      proxy.writeQuery({
        query: graphql.FETCH_POSTS_QUERY,
        data:  {getPosts: data.getPosts.filter(post => post.id !== postId)},
      });

      callback?.(commentId);
    },
  });

  if (currentUserId !== ownerUserId) return null;

  return (
    <Button disabled={loading} onClick={deleteElement}>🗑 <span>delete</span></Button>
  );
}

export default React.memo(DeleteButton);