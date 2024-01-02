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
                return res.status(404).json({ message: `No user with that ID. Could not GET.`})
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
    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a user

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});

            if (!user) {
                return res.status(404).json({ message: `No user with that id found. Could not delete.` });
            }

            // Delete that user's thoughts. Find user using "$in:" operator
            await Thought.deleteMany({ _id: {$in: user.thoughts }});
            /* 
            const thought = await Thought.findOnAndUpdate(
                { _id: req.params.userId},
                { $pull: req.body },
                // { new: true }
            )
            */
            res.status(200).json({ message: `Deleted user and their thoughts.` })
        } catch(err) {
            res.status(500).json({ message: `No thought found with that user id. Could not delete.`})
        }
    },

    // add a friend for a specific user
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendsId }}, //<--- use "$addToSet:" to add to friends array
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: `No ID found for this ID. Could not add friend.`});
            }

            res.json(user);
        } catch(err) {
            res.status(500).json({ message: `No user found with that ID`});
        }
    },

    // remove a friend from a specific user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendsId }}, //<--- use "$pull:" to remove out of friends array
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: `No ID found for this ID. Could not remove friend.`});
            }
        } catch(err) {
            res.status(500).json({ message: `No user found with that ID`});
        }
    }
};