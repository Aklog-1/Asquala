
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: {type: String, required: true},
    password: { type: String, required: true },
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    bio: {
        type: String,
        default: ""
    },
    posts: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "posts"}], 
        default: []
    },

    // followers: {},
    createdDate: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model("users", userSchema)