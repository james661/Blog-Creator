const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes);
const viewRoutes = require('./viewRoutes');
router.use('/', viewRoutes);

module.exports = router;