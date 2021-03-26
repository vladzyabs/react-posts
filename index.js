const {ApolloServer} = require('apollo-server'); // Сервер
const mongoose       = require('mongoose'); // db

const typeDefs  = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config');

// Инициализация сервера
const server = new ApolloServer({
  typeDefs,
  resolvers,
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