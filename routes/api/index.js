const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const friendRoutes = require('./friendRoutes')
const reactionRoutes = require('./reactionRoutes')

router.use('/users', userRoutes, friendRoutes);
router.use('/thoughts', thoughtRoutes, reactionRoutes);

module.exports = router;
