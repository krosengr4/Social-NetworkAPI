//! This file contains controllers to get, create, update, and delete thoughts, as well as create and delete reactions.

// import User and Thought model
const { User, Thought } = require('../models');

//export all get, create, update, and delete thoughts && add and remove reactions
module.exports = {

    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch(err) {
            res.status(500).json(err);
        };
    },

    // Get a single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId});

            if(!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
            };
            
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id} },
                { new: true },
            );
            if(!user) {
                return res.status(404).json({ message: `Thought was created, but could not find and link to user id`});
            };

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            res.status(200).json({ message: `Thought successfully deleted`})
        } catch(err) {
            res.status(500).json(err);
        }
    },
    
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $set: req.body }, //<--- use "$set" to pass in new thought
                { new: true},
            );

            if (!thought) {
                return res.status(404).json({ message: `No ID found for this Thought. Could not update.`})
            };
            res.json(thought);
        }catch(err) {
            res.status(500).json(err);
        };
    },

    // Create reaction on specific thought
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body} }, //<--- use "$addToSet:" to add reaction with content of req body.
                { new: true },
            );
            if(!thought) {
                res.status(404).json({ message:`Could not find thought with this ID. Could not create reaction.`});
            };

            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    }, 

    // Delete rection
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.params.reactionId}}, //<--- use "$pull:" to remove out of reactions array
                { new: true },
            );
            if(!thought){
                return res.status(404).json({ message: `Could not find thought with this ID. Could not delete reaction.`});
            };

            res.json(thought);
        } catch(err) {
            res.status(500).json(err);
        }
    }
};
