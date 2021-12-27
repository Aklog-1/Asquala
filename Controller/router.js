
const express = require('express');
const postSchema = require('../Model/Post')
const userSchema = require('../Model/User')


const apiRouter = express.Router();




// Sign up API

apiRouter.post("/signUp", async (req, res) => {
    
    let {name, userName, email, password} = req.body

    // const existingUser = await userSchema.findOne({email: email})
    // if(existingUser) {
    //     res.status(406).send({
    //         message: `sorry, an account with email: ${email} has already been created.`
    //     })
    // }

    // const SameUserName = await userSchema.findOne({userName: userName})
    // if(SameUserName) {
    //     res.status(406).send({
    //         message: `sorry, user name taken. Try another one...`
    //     })
    // }


    const newUser = new userSchema({
        name,
        userName,
        email,
        password
    })
    console.log(newUser)

    try {
        await newUser.save();
        res.status(201).send({
            message: `Account successfully created!`,
            user: newUser
        })
    } catch (err) {
        res.send({
            message:`Something went wrong`,
        })
    }
})








module.exports = apiRouter