//! This file contains the routers for Thoughts

// import express for router middlewear
const router = require('express').router();

// import all thought controllers 
const{
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require ('../../controllers/thoughtController');

// create route for the url: /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought)
    .post(createReaction);
    

// create route for the url: /api/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)
    .delete(deleteReaction);

// create route for the url: /api/:thoughtId
router.route ('thoughtId/reactions').post(createReaction);

// create route for the url: /api/:thoughtId/reactions
router.route(':thoughtId/reactions/:reactionId').delete(deleteReaction);    