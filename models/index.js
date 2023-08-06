const Post = require('./Post');
const User = require('./User');
const Comment = require('./comment');

Post.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Post, {
  foreignKey: 'userId'
});

Comment.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = { 
  Post, 
  User,
  Comment
};