const gql = require('graphql-tag');

// Типы, запросы, мутации и подписка
module.exports = gql`
  # Типы данных для постов
  type Post {
    id:        ID!
    body:      String!
    username:  String!
    user:      ID!
    createdAt: String!
    comments:  [Comment]!
    likes:     [Like]!
  }
  # Тип данных для комментариев
  type Comment {
    id:        ID!
    body:      String!
    username:  String!
    user:      ID!
    createdAt: String!
  }
  # Тип данных для лайков
  type Like {
    id:        ID!
    createdAt: String!
    username:  String!
    user:      ID!
  }
  # Типы данных для пользователей
  type User {
    id:        ID!
    username:  String!
    email:     String!
    token:     String!
    createdAt: String!
  }
  # Типы данных полей при регистрации
  input RegisterInput {
    username:        String!
    password:        String!
    confirmPassword: String!
    email:           String!
  }
  # Типы данных полей при смене пароля
  input ChangePasswordInput {
    email:           String!
    lastPassword:    String!
    password:        String!
    confirmPassword: String!
  }
  # Запросы
  type Query {
    getPosts:             [Post]
    getPost(postId: ID!): Post
  }
  # Мутации
  type Mutation {
    register(registerInput: RegisterInput):                   User!
    login(email: String!, password: String!):                 User!
    changePassword(changePasswordInput: ChangePasswordInput): User!

    createPost(body: String!): Post!
    deletePost(postId: ID!):   String!

    createComment(postId: ID!, body: String!):  Post!
    deleteComment(postId: ID!, commentId: ID!): Post!

    likePost(postId: ID!): Post!
  }
`;