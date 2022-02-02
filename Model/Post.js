
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    content: { type: String, required: true },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    },
    likes: {
        type: [{
            actorId: {
                type: mongoose.Schema.ObjectId, ref: "users"
            },
            likeType: {
                type: String, default: "like"
            }
        }],
        default: null
    },

    comments: {
        type: [{
            actorId: {
                type: mongoose.Schema.ObjectId, ref: "users"
            },
            commentContent: {
                type: String,
                default: null
            }
        }],

        default: null
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
})





module.exports = mongoose.model("posts", postSchema)