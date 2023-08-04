const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { };

Comment.init(
  {
    body: DataTypes.STRING
  },
  { sequelize }
);

module.exports = Comment;