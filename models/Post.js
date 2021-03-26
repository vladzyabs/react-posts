const {model, Schema} = require('mongoose');

const postSchema = new Schema({
  body:      String,
  createdAt: Date,
  username:  String,
  comments:  [
    {
      body:      String,
      username:  String,
      createdAt: Date,
      user:      {
        type: Schema.Types.ObjectId,
        ref:  'User',
      },
    },
  ],
  likes:     [
    {
      username:  String,
      createdAt: Date,
      user:      {
        type: Schema.Types.ObjectId,
        ref:  'User',
      },
    },
  ],
  user:      {
    type: Schema.Types.ObjectId,
    ref:  'User',
  },
});

module.exports = model('Post', postSchema);