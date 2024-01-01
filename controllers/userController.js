//! This file contains controllers to get, create, update, and delete a user, as well as add and remove a friend.

// import User and Thought model
const { User, Thought } = require('../models');

//export all get, create, update, and delete users && add and remove friends
module.exports = {

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: "No user with that ID"})
            }

            res.json({
                user,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create new user

    // Update a user

    // Delete a user

    // add a friend to a specific user

    // remove a friend from a specific user

};