import gql from 'graphql-tag';

// Получение всех постов
const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      title
      body
      createdAt
      userId
      username
      comments {
        id
        body
        createdAt
        userId
        username
      }
      likes {
        id
        createdAt
        userId
        username
      }
      commentCount
      likeCount
    }
  }
`;

// Получение поста по id
const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      body
      createdAt
      userId
      username
      likes {
        id
        createdAt
        userId
        username
      }
      comments {
        id
        createdAt
        body
        userId
        username
      }
      commentCount
      likeCount
    }
  }
`;

// === === === === === === === === === ===

// Добавление комментария
const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: ID!, $body: String!){
    createComment(postId: $postId, body: $body){
      comments{
        id
        body
        userId
        username
        createdAt
      }
    }
  }
`;

// Создание поста
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!, $title: String!){
    createPost(body: $body, title: $title) {
      id
      body
      title
      username
      userId
      createdAt
      commentCount
      likeCount
    }
  }
`;

// Удаление комментария
const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

// Удаление поста
const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!){
    deletePost(postId: $postId)
  }
`;

// Лайк поста
const LIKE_POST_MUTATION = gql`
  mutation LikePost ($postId: ID!){
    likePost(postId: $postId){
      id
      likes {
        id
        userId
        username
      }
      likeCount
    }
  }
`;

// === === === === === === === === === ===

// Авторизация
const LOGIN_USER = gql`
  mutation Login(
    $email:    String!
    $password: String!
  ){
    login(
      email:    $email
      password: $password
    ){
      id
      token
      username
      createdAt
      email
    }
  }
`;

// Регистрация пользователя
const REGISTER_USER = gql`
  mutation Register(
    $username:        String!
    $email:           String!
    $password:        String!
    $confirmPassword: String!
  ){
    register(
      registerInput: {
        username:        $username
        email:           $email
        password:        $password
        confirmPassword: $confirmPassword
      }
    ){
      id
      token
      username
      createdAt
      email
    }
  }
`;

export const graphql = {
  CREATE_COMMENT_MUTATION,
  CREATE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
  LIKE_POST_MUTATION,

  FETCH_POSTS_QUERY,
  FETCH_POST_QUERY,

  LOGIN_USER,
  REGISTER_USER,
};