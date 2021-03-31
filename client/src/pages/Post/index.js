import React         from 'react';
import { useParams } from 'react-router-dom';
import { useQuery }  from '@apollo/client';

import { Container } from '../../components/@ui';
import { formatDate }        from '../../utils';
import { graphql as gql }    from '../../graphql';
import LikeButton            from '../../components/Buttons/LikeButton';
import { useAuth }           from '../../context';
import Commentaries          from '../../components/Commentaries';

export default function Post() {
  const {user}   = useAuth();
  const {postId} = useParams();

  const {loading, data} = useQuery(gql.FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const {
          id,
          title,
          body,
          createdAt,
          username,
          comments,
          commentCount,
          likeCount,
          likes,
        } = data?.getPost;

  return (
    <div className={'page-wrapper'}>
      <Container>
        <h1>{title}</h1>
        <span>{formatDate(createdAt)}</span>
        <span>{username}</span>
        <p>{body}</p>

        <LikeButton currentUserId={user?.id || null} post={{likes, likeCount, postId: id}} />

        <hr />

        <Commentaries
          comments={comments}
          commentCount={commentCount}
          currentUserId={user?.id || null}
          postId={id}
        />

      </Container>
    </div>
  );
}