const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userSchema = require("../Model/User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json("you must be logged in.");
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json("you must be logged in");
        }

        const { _id } = payload;
        userSchema.findById(_id).then((userdata) => {
            req.user = userdata;
        });

        next();
    });
};
