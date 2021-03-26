const jwt                   = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server');

const {SECRET_KEY} = require('../config');

module.exports = (context) => {
  // context = { headers }
  // Получаем HTTP-заголовок с информацией об аутентификации
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    // Bearer [token]
    // Получаем токен
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        // Проверяем аутентификацию
        return jwt.verify(token, SECRET_KEY);
      } catch (error) {
        throw new AuthenticationError('Invalid/Expire token');
      }
    }

    throw new Error('Authentication token must be \'Bearer [token]');
  }

  throw new Error('Authentication header must be provided');
};