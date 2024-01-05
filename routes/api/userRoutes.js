//! This file contains the routers for Users

// import express for router middlewear
const router = require('express').Router();

// import all user controllers 
const{
    getUsers,
    getSingleUser,
    createNewUser,
    deleteUser,
    addFriend,
    removeFriend
} = require ('../../controllers/userController');

// create route for the url: /api/users
router.route('/')
.get(getUsers)
.post(createNewUser);

// create route for the url: /api/:userId
router.route('/:userId')
.get(getSingleUser)
// .put(updateUser)
.delete(deleteUser);

// create route for the url: /api/:userId/friends/friendId
router.route('/userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

// export all routes through router
module.exports = router;
