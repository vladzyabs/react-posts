const commentsResolvers = require('./comments');
const postsResolvers    = require('./posts');
const usersResolvers    = require('./users');

module.exports = {
  Post:         {
    likeCount:    (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query:        {
    ...postsResolvers.Query,
  },
  Mutation:     {
    ...commentsResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};