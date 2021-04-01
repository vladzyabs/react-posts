import React                     from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery }              from '@apollo/client';

import Commentaries       from '../../components/Commentaries';
import DeleteButton       from '../../components/Buttons/DeleteButton';
import LikeButton         from '../../components/Buttons/LikeButton';
import PATHS              from '../../paths';
import { Container }      from '../../components/@ui';
import { formatDate }     from '../../utils';
import { graphql as gql } from '../../graphql';
import { useAuth }        from '../../context';

export default function Post() {
  const {user}   = useAuth();
  const {postId} = useParams();
  const history  = useHistory();

  const {loading, data, refetch} = useQuery(gql.FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const handleDeletePost = () => history.push(PATHS.HOME);

  const refetchData = React.useCallback(async () => await refetch(), [refetch]);

  React.useEffect(() => {
    refetchData();
  }, [refetchData]);

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
          userId,
        } = data?.getPost;

  return (
    <div className={'page-wrapper'}>
      <Container>
        <h1>{title}</h1>
        <span>{formatDate(createdAt)}</span>
        <span>{username}</span>

        <DeleteButton
          callback={handleDeletePost}
          currentUserId={user.id}
          postId={postId}
          ownerUserId={userId}
        />

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