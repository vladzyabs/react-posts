const {AuthenticationError} = require('apollo-server');

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
        throw new Error('Post must not be empty');
      }

      const newPost = new Post({
        body,
        user:      user.id,
        username:  user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      // Уведомляем подписчиков о новом посте
      context.pubSub.publish('NEW_POST', {
        newPost: post,
      });

      return post;
    },

    // Удаление поста
    deletePost: async (_, {postId}, context) => {
      const user = checkAuth(context);

      try {
        // Находим пост
        const post = await Post.findById(postId);

        // Удалять посты может только добавивший их пользователь
        if (user.id.toString() === post.user.toString()) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  // Подписка
  Subscription: {
    newPost: {
      subscribe: (_, __, {pubSub}) => pubSub.asyncIterator('NEW_POST'),
    },
  },
};