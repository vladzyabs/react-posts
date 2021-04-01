const {ApolloServer, PubSub} = require('apollo-server'); // Сервер
const mongoose               = require('mongoose'); // db

const typeDefs  = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config');

const pubSub = new PubSub();

// Инициализация сервера
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req, pubSub}),
});

// Подключение db
// Запуск сервера
mongoose.connect(MONGODB, {
  useNewUrlParser:    true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(`Connected to database`);
    return server.listen({port: 5000});
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  });

// refactoring models (Post: user -> userId, Like: user -> userId, Comment: user -> userId ...)
// create comment
// TODO: delete comment
// TODO: added user avatar (display on post card, single post)
// TODO: added change profile (username, password)
// TODO: added change post (title, body)
// TODO: search posts (title)