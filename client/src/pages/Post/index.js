import React         from 'react';
import { useParams } from 'react-router-dom';
import { useQuery }  from '@apollo/client';

import { Container }      from '../../components/@ui';
import { formatDate }     from '../../utils';
import { graphql as gql } from '../../graphql';
import LikeButton         from '../../components/Buttons/LikeButton';
import { useAuth }        from '../../context';

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

        {comments.length > 0 && (
          <div>
            <span>💬{' '}{commentCount}</span>
            {comments.map(comment => {
              return (
                <div key={comment.id} style={{borderBottom: '1px solid #dadada'}}>
                  <span>{comment.username}</span>
                  <span>{formatDate(comment.createdAt)}</span>
                  <p>{comment.body}</p>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}