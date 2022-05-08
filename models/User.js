const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'User name is required!'],
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Valid email is required'],
        trim: true,
    },
    thoughts: [
        {
            type: Schema.types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
            type: Schema.types.ObjectId,
            ref: "User",
        },
    ],
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

);

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.lenght;
    })

const User = model('User', userSchema);

module.exports = User;