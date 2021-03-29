import React        from 'react';
import { useQuery } from '@apollo/client';
import gql          from 'graphql-tag';

import { Container, Grid, PostCard } from '../../components';

export default function Home() {
  const {loading, data}   = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    if (!loading && data) {
      setPosts(data?.getPosts);
    }
  }, [setPosts, data, loading]);

  return (
    <div className={'page-wrapper'}>
      <Container>
        <h1>Home</h1>
        <Grid>
          {posts && (
            posts.map(post => <PostCard key={post.id} {...post} />)
          )}
        </Grid>
      </Container>
    </div>
  );
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      createdAt
      body
      user
      username
      commentCount
      likeCount
      title
    }
  }
`;