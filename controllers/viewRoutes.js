const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
// Route to find all posts
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [User] });
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to find one post by its primarykey
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, { include: [User] });
    if (!postData) {
      res.status(500).end();
    }
    const post = postData.get({ plain: true });
    res.render("post", post);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to login once the password is accepted
router.get("/auth", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("auth");
});

module.exports = router;