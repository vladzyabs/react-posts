import React        from 'react';
import { Link }     from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Container, Grid, Loader } from '../../components/@ui';
import { PostCard }                from '../../components';
import { graphql }          from '../../graphql';
import { useAuth }                 from '../../context';

export default function Home() {
  const {user}            = useAuth();
  const {loading, data}   = useQuery(graphql.FETCH_POSTS_QUERY);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setPosts(data?.getPosts);
    }
  }, [setPosts, data]);

  return (
    <div className={'page-wrapper'}>
      {loading && (
        <Loader />
      )}
      <Container>
        <h1>Home</h1>
        <Grid>
          {posts && (
            <>
              {user && (
                <Link to={'/create-post'} className={'post-card'}>
                  <span>create post</span>
                </Link>
              )}
              {posts.map(post => <PostCard key={post.id} currentUserId={user?.id || null} {...post} />)}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
}