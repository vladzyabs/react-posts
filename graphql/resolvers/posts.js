const checkAuth = require('../../utils/checkAuth');
const Post      = require('../../models/Post');

module.exports = {
  // Запросы
  Query: {
    // Получение всех постов
    getPosts: async () => {
      try {
        return await Post.find().sort({createdAt: -1});
      } catch (error) {
        throw new Error(error);
      }
    },

    // Получение поста по id
    getPost: async (_, {postId}) => {
      try {
        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  // Мутации
  Mutation: {
    // Создание поста
    createPost: async (_, {body}, context) => {
      // Получаем пользователя
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new Error('Пост не может быть пустым');
      }

      const newPost = new Post({
        body,
        user:      user.id,
        username:  user.username,
        createdAt: new Date().toISOString(),
      });

      return await newPost.save();
    },
  },
};