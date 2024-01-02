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
            res.json(thought);
        } catch (err) {
            res.status(505).json(err);
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
    }
    
    // Update a thought

    // Create reaction on specific thought

    // Delete rection
    
};
