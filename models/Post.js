const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    minLength: 3
  },
  text: {
    type: DataTypes.STRING,
    maxLength: 280
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
  },
  {
  sequelize,
  freezeTableName: true,
  modelName: "post"
});

module.exports = Post;