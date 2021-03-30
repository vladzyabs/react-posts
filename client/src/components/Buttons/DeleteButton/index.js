import React           from 'react';
import { useMutation } from '@apollo/client';
import * as PropTypes  from 'prop-types';

import { graphql } from '../../../graphql';

import { Button } from '../../@ui';

DeleteButton.propTypes = {
  postId: PropTypes.string,
};

function DeleteButton({postId}) {
  const [deleteElement, {loading}] = useMutation(graphql.DELETE_POST_MUTATION, {
    variables: {
      postId,
    },
    update(proxy) {
      const data = proxy.readQuery({query: graphql.FETCH_POSTS_QUERY});

      proxy.writeQuery({
        query: graphql.FETCH_POSTS_QUERY,
        data:  {getPosts: data.getPosts.filter(post => post.id !== postId)},
      });
    },
  });

  return (
    <Button disabled={loading} onClick={deleteElement}>🗑 <span>delete</span></Button>
  );
}

export default React.memo(DeleteButton);