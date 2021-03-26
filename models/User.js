const {model, Schema} = require('mongoose');

const userSchema = new Schema({
  createdAt: Date,
  email:     String,
  password:  String,
  username:  String,
});

module.exports = model('User', userSchema);