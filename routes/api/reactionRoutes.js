const router = require("express").Router();

const {
    // POST to create a reaction saved in a single thought's reactions 
    createReaction,
    // DELETE to pull and remove a reaction by a reactions id
    removeReaction
} = require('../../controllers/reactionController')

router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);

module.exports = router