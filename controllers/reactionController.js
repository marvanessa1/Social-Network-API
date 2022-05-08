const { Thought } = require('../models');


module.exports = {
  // create a new reaction
  createReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id was found' })
          : res.json({ message: 'Added reaction to thought' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove reaction from thought
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'Reaction deleted, but no thoughts' })
          : res.json({ message: 'Rection was removed from thought' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
