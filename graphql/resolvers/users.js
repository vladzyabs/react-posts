const bcrypt           = require('bcryptjs');
const jwt              = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const User         = require('../../models/User');
const {SECRET_KEY} = require('../../config');
const {
        validateRegisterInput,
        validateLoginInput,
        validateChangePasswordInput,
      }            = require('../../utils/validators');

const generateToken = (user) => {
  return jwt.sign(
    {
      id:       user.id,
      email:    user.email,
      username: user.username,
    },
    SECRET_KEY,
    {expiresIn: '1h'},
  );
};

module.exports = {
  // Мутации - операции по изменению "состояния" пользователей
  Mutation: {
    // Регистрация
    register: async (_, {email, password, confirmPassword, username}) => {
      // Проверяем данные на валидность
      const {errors, valid} = validateRegisterInput(email, password, confirmPassword, username);

      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }

      // Пытаемся найти пользователя с таким email
      const user = await User.findOne({email});

      if (user) {
        throw new UserInputError('Email already taken', {
          errors: {
            email: 'This mail is already taken',
          },
        });
      }

      // Шифрование пароля
      const _password = await bcrypt.hash(password, 12);

      // Создание нового пользователя
      const newUser = new User({
        email,
        createdAt: new Date().toISOString(),
        password:  _password,
        username,
      });

      // Сохрание пользователя в БД
      const res = await newUser.save();

      // Создание токена
      const token = generateToken(res);

      // Возарвщаем данные пользователя и его токен
      return {
        id: res._id,
        ...res._doc,
        token,
      };
    },

    // Авторизация
    login: async (_, args) => {
      const {email, password} = args;

      // Проверяем данные на валидность
      const {errors, valid} = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }

      // Получаем пользователя из БД по email
      const user = await User.findOne({email});

      // Если пользователь не найден
      if (!user) {
        throw new UserInputError('User not found', {
          errors: {
            general: 'User not found',
          },
        });
      }

      // Проверяем пароль, сравнивая пароль, введенный пользователем, и пароль из БД
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError('Wrong credentials', {
          errors: {
            general: 'Wrong credentials',
          },
        });
      }

      // Создание токена
      const token = generateToken(user);

      return {
        id: user._id,
        ...user._doc,
        token,
      };
    },

    // Изменение пароля
    changePassword: async (_, args) => {
      const {email, lastPassword, password, confirmPassword} = args.changePasswordInput;

      const {errors, valid} = validateChangePasswordInput(password, confirmPassword);

      // Проверяем данные на валидность
      if (!valid) {
        throw new UserInputError('Errors', {
          errors,
        });
      }

      // Получаем пользователя из БД по email
      const user = await User.findOne({email});

      // Если пользователь не найден
      if (!user) {
        throw new UserInputError('User not found', {
          errors: {
            general: 'User not found',
          },
        });
      }

      // Проверяем пароль, сравнивая пароль, введенный пользователем, и пароль из БД
      const match = await bcrypt.compare(lastPassword, user.password);

      if (!match) {
        throw new UserInputError('Incorrect last password', {
          errors: {
            general: 'Incorrect last password',
          },
        });
      }

      // Шифрование пароля
      const _password = await bcrypt.hash(password, 12);

      // Обновление пароля в БД
      await User.updateOne({email}, {$set: {password: _password}});

      // Создание токена
      const token = generateToken(user);

      // Возарвщаем данные пользователя и его токен
      return {
        id: user._id,
        ...user._doc,
        token,
      };
    },
  },
};