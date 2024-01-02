//! This file contains the model js for how thought and reaction data goes into the database.

// import model, Schema, and Types from mongoose
const { model, Schema, Types } = require('mongoose');
// import moment to format createdOn
const moment = require('moment');

// Create thought model using Schema
const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdOn: {
        type: Date,
        default: Date.now,
        // moment from line 5-6
        get: (date) => moment(date).format("MMM DD, YYYY [at] hh:mm a")
    },
    username: {
        type: String, 
        required: true,
    },
    reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true, 
            getters: true,
        },
        id: false,
    }
)

// Create reaction model using Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String, 
            required: true,
            maxLength: 250
        },
        username: {
            type: String,
            required: true,
        },
        createdOn: {
            type: Date,
            default: Date.now,
            // moment from line 5-6
            get: (date) => moment(date).format("MMM DD, YYYY [at] hh:mm a")
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// make virtual to get the length of the thoughts reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  })

// Keep thought model in a Class const
const Thought = model('thought', ` `);

// Export thought model
module.exports = Thought;