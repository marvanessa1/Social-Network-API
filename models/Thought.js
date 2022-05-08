const { time } = require('console');
const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timeStamp) => dateFormat(timestamp),
    },
    userName: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.lenght;
    })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;