const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// route to create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const { title, text } = req.body;
    const user_id = req.session.user_id;
    const dbPostData = await Post.create({ title, text, user_id });
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// route to update a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update(req.body, {
      where: {
        id: req.params.id
      }
    });
// If there isn't a post with the id in the data, return this message
    if (dbPostData[0] === 0) {
      res.status(404).json({ message: 'No post with this id' });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// route to remove a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });
  // if there isn't a post with the id, return this message
    if (!dbPostData) {
      res.status(404).json({ message: 'No post with this id' });
      return;
    }
    res.json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;