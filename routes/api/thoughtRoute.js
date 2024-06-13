const router = require('express').Router();
const{ getThoughts, getSingleThought, createThought, deleteThought, updateThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

//Get all thoughts and create a single thought route
router.route('/').get(getThoughts).post(createThought);

//Get single thought by Id
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// Create a new reaction for a thought
router.route('/:thoughtId/reactions').post(addReaction);

//Delete a reaction on a thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Delete a thought by it's id
module.exports = router;