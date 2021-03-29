import gql from 'graphql-tag';

// Получение всех постов
export const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      title
      body
      createdAt
      user
      username
      comments {
        id
        body
        createdAt
        user
        username
      }
      likes {
        id
        createdAt
        user
        username
      }
      commentCount
      likeCount
    }
  }
`;

// Получение поста по id
export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      body
      createdAt
      user
      username
      likes {
        id
        createdAt
        user
        username
      }
      comments {
        id
        createdAt
        body
        user
        username
      }
      commentCount
      likeCount
    }
  }
`;