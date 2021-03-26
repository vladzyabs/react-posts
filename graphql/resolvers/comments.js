const {
        AuthenticationError,
        UserInputError,
      } = require('apollo-server');

const checkAuth = require('../../utils/checkAuth');
const Post      = require('../../models/Post');

module.exports = {
  Mutation: {
    // Добавление комментария посту
    createComment: async (_, {postId, body}, context) => {
      const {id, username} = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          error: {
            body: 'Comment body must not empty',
          },
        });
      }

      // Получаем пост из БД
      const post = await Post.findById(postId);

      if (post) {
        // Добавляем новый комментарий в начало массива
        post.comments.unshift({
          body,
          username,
          user:      id,
          createdAt: new Date().toISOString(),
        });

        // Сохраняем пост в БД
        await post.save();

        // и возвращаем его
        return post;
      } else throw new UserInputError('Post not found');
    },

    // Удаление комментармя у поста
    deleteComment: async (_, {postId, commentId}, context) => {
      // Получаем пользователя
      const user = checkAuth(context);

      // Получаем пост из БД
      const post = await Post.findById(postId) || null;

      if (post) {
        // Определяем индекс комментария
        const index = post.comments.findIndex(c => c.id === commentId);

        // Если комментарий не найден
        if (index === -1) {
          throw new UserInputError('Comment not found')
        }

        // Комментарии может удалять только добавивший его пользователь
        if (post.comments[index].user.toString() === user.id.toString()) {
          // Удаляем комментарий
          post.comments.splice(index, 1);

          // Сохраняем пост в БД
          await post.save();

          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    },
  },
};