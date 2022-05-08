const router = require("express").Router();

const {
    //GET all users
    getUsers,
    //GET a single user by its _id and populated thought and friend data
    getSingleUser,
    //POST a new user
    createUser,
    //PUT to update a user by its _id
    updateUser,
    //DELETE to remove a user by its _id
    deleteUser
}= require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);




module.exports = router