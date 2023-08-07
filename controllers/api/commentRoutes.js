const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
  try {
    const { comment_text, post_id } = req.body;
    const user_id = req.session.user_id;
    const dbCommentData = await Comment.create({ comment_text, user_id, post_id });
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbCommentData) {
      res.status(500).json({ message: 'No comment with this ID' });
      return;
    }
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;