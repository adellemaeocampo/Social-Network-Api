//defines and imports router and controller requests
const router = require('express').Router();
const { getUsers, getSingleUser, createUser, deleteUser, updateUser, addFriend, deleteFriend } = require('../../controllers/userController');

//get all users and post a new user
router.route('/').get(getUsers).post(createUser);

//get a single user by ID and populated thought and friend data
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

//adds friend to user
router.route('/:userId/friends').post(addFriend);

//deletes a user friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;