const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDB = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const post of postData) {
    await Post.create({
      ...post, user_id:[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};

seedDB();