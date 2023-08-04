const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Post extends Model {};

Post.init(
  {
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
    maxLength: 280
  }
},
  sequelize,
  modelName: "post"
  )