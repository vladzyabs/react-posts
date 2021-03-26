const Post = require('../../models/Post');

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        return await Post.find();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};