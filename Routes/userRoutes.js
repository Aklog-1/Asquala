
const { Router } = require('express');
const userSchema = require('../Model/User')


const userRouter = Router();


userRouter.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to Asquala - this is users api"
    })
})



// Sign up API

userRouter.post("/signUp", async (req, res) => {
    
    const {name, userName, email, password} = req.body

    const existingUser = await userSchema.findOne({email: email})
    const SameUserName = await userSchema.findOne({userName: userName})
    if (existingUser) {
        return res.status(406).send({
            message: `sorry, an account with email: ${email} has already been created.`
        })
    } else if (SameUserName) {
        return res.status(406).send({
            message: `sorry, user name taken. Try another one...`
        })
    }

    const newUser = new userSchema({
        name,
        userName,
        email,
        password
    })
    console.log(newUser)

    try {
        await newUser.save()
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




// update status api
        // Authentication blah blah to be added
userRouter.put("/update/:userName", async (req, res) => {

    const userName = req.params.userName

    try {
        const updatedUser = await userSchema.findOneAndUpdate({userName: userName}, {$set: req.body})
        return res.status(201).send({
            message: `status updated successfully!`,
            user: updatedUser
        })
    } catch (err) {
        res.status(400).send({
            message: `something went wrong.`
        })
    }

})




// get other people api

userRouter.get("/getPerson/:userName", async (req, res) => {
    
    const userName = req.params.userName

    try {
        const userFound = await userSchema.findOne({userName: userName}, {"password" : 0}).populate({path: "posts"})
        if(!userFound) return res.status(400).send({message: `Such user doesn't exist.`})

        return res.status(200).send({
            message: `Successfull`,
            user: userFound
        })
    } catch (err) {
        return res.status(500).send({message: `Something went wrong.`})
    }
    
})




module.exports = userRouter