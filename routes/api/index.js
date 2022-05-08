const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const friendRoutes = require('./friendRoutes')

router.use('/users', userRoutes, friendRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
