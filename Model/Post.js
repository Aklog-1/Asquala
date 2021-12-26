
const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

    content: { type: String, required: true },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    like: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        default: null
    }, //           likes and comments to be changed later.
    timestamp: {
        type: Date,
        default: Date.now
    }
})





module.exports = mongoose.model("posts", postSchema)