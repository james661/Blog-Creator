const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
};

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
    maxLength: 20
    }
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updateUserData) {
        updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
        return updateUserData;
      }
    },
    sequelize,
    freezeTableName: true,
    modelName: 'user'
  }
);

module.exports = User;