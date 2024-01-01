//! This file contains the model js for how user data goes into the database.

// Import schema and model by requiring mongoose
const { Schema, model } = require('mongoose');

//import the thought schema
const thoughtSchema = require('./Thought');

// Create user model using Schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true, 
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Regex to validate email
            validate: {
                validator: function(email) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
                },
                // Error handler if validation failed
                message: props => `${props.value} is not a valid email.`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// put User model in class const
const User = model('user', userSchema);

module.exports = User;
