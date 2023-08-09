const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
// route to create a user
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const dbUserData = await User.create({ username, password });
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    req.session.save(( ) => {
      res.json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// login route
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.udername,
      },
    });
    // check if the user matches saved data
    if (!dbUserData) {
      res.status(500).json({ message: 'Not user with this name' });
      return;
    }
    const validatePassword = dbUserData.checkPassword(req.body.password);
    if (!validatePassword) {
      res.status(500).json({ message: 'Wrong password' });
      return;
    }
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;
    req.session.save(() => {
      res.json({ user: dbUserData, message: 'Now logged in' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// route to log out
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // ends the session
    req.session.destroy(() => {
      res.status(200).end();
    });
  } else {
    res.status(500).end();
  }
});
// route to update a user
router.put('/:id', async (req, res) => {
  try {
    const dbUserData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      },
    });
    if (!dbUserData[0]) {
      res.status(500).json({ message: 'No user with this ID' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// route to remove a user
router.delete('/:id', async (req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!dbUserData) {
      res.status(500).json({ message: 'No user with this ID' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;