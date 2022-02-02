const { Router } = require("express");
const postSchema = require("../Model/Post");
const userSchema = require("../Model/User");

const postRouter = Router();

postRouter.get("/", (req, res) => {
    res.status(200).send({
        message: "Welcome to Asquala - this is routes api",
    });
});

// create post
// will do further on this one
postRouter.post("/createPost", async (req, res) => {
    const { content, author } = req.body;
    const user = await userSchema.findById(author);

    const newPost = new postSchema({
        content,
        author,
    });

    try {
        user.posts.push(newPost._id);
        await user.save();
        await newPost.save();
        res.status(201).send({
            message: `Content posted successfully.`,
            post: newPost,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(`sth is wrong`);
    }
});

// comment post
postRouter.post("/commentOnPost", async (req, res) => {
    const { commentContent, actorId, postId } = req.body;

    try {
        let post = await postSchema.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    actorId,
                    commentContent,
                },
            },
        });
        return res.status(201).send({
            message: "Comment is added successfully!",
            post: post,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            message: "sth is wrong",
        });
    }
});

module.exports = postRouter;
