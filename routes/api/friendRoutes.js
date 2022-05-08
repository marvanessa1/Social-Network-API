const router = require("express").Router();

const {
    // POST route to add a new friend to a user's friend list
    addFriend,
    // DELETE route to remove a friend from a user's friend list
    removeFriend
} = require('../../controllers/friendController')

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router