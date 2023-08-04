const sequelize = require('../config');
const { Model, DataTypes } = require('sequelize');

Class User extends Model {
  checkPassword(password) {

  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})