const { User } = require('../models');


module.exports = {
  // add a new friend to a user's friend list - POST
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id was found' })
          : res.json({ message: 'Friend was added to users friend list' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a user's friend list - DELETE
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
          : res.json({ message: 'Friend was removed from users friend list' })
      )
      .catch((err) => res.status(500).json(err));
  },
};