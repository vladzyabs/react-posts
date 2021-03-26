const gql = require('graphql-tag');

// Типы, запросы, мутации и подписка
module.exports = gql`
  # Типы данных для постов
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  # Типы данных для пользователей
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  # Типы данных полей при регистрации
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  # Типы данных полей при смене пароля
  input ChangePasswordInput {
    email: String!
    lastPassword: String!
    password: String!
    confirmPassword: String!
  }
  # Запросы
  type Query {
    getPosts: [Post]
  }
  # Мутации
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    changePassword(changePasswordInput: ChangePasswordInput): User!
  }
`;