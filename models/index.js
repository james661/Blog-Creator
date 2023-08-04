const Post = require('./Post');
const User = require('./User');

Post.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Post, {
  foreignKey: 'userId'
});

module.exports = { 
  Post, 
  User,
  Comment
};