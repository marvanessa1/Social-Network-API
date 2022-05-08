const router = require("express").Router();

const {
    // GET to get all thoughts
    getThoughts,
    // GET to get asingle thought by its _id
    getSingleThought,
    // POST to create a new thought
    createThought,
    // PUT to update a thought by its _id
    updateThought,
    // DELETE to remove a thought by its _id
    deleteThought
} = require('../../controllers/thoughtController');

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router