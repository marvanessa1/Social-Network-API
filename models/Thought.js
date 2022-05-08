const { time } = require('console');
const { Schema, model } = require('mongoose');
const { stringify } = require('querystring');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId(),
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: [280, 'Maximum character count is 280!'],
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: [280, 'Maximum character count is 280!'],
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