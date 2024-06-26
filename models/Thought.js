const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

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
        get: timestamp => new Date(timestamp).toLocaleDateString()
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [Reaction]
},
{
    toJSON: {
        virtuals: true,
    }, 
    id:false,
}
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.Reaction.length;
    });

const Thought = model('thought', thoughtSchema);
module.exports = Thought;

